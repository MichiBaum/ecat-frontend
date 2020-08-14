import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {Promotion} from "../../models/promotion";
import {AuthenticationService} from "../../services/authentication.service";
import {ConfirmationService, ContextMenu, MenuItem} from "primeng";
import {PromotionEditorService} from "../../services/promotion-editor.service";
import {PromotionService} from "../../services/promotion.service";
import {TranslateService} from "@ngx-translate/core";
import {ContextmenuService} from "../../services/contextmenu.service";
import {WindowResizeListenerService} from "../../services/window-resize-listener.service";

@Component({
  selector: 'app-promotion-card',
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.scss'],

})
export class PromotionCardComponent implements OnInit {
  loading: boolean = true;
  expanded: boolean = false;
  showDescription: boolean = false;
  animationTimeout;
  screenWidth: number;
  @Input()newPromotion: boolean = false;
  @Input() promotion: Promotion;
  @Output() deletePromotion = new EventEmitter();
  @ViewChild('container') containerElement: ElementRef;
  @ViewChild('imageContainer') imageContainer: ElementRef;
  @ViewChild('contextMenu') contextMenu: ContextMenu;
  @HostBinding('class') get hostClasses(): string{
    return this.expanded ? 'p-col-12': this.newPromotion ? 'p-col-12 p-lg-6' : 'p-col-6 p-lg-3';
  };
  promotionContextItems: MenuItem[];

  constructor(private renderer2: Renderer2,
              public authService: AuthenticationService,
              private promotionEditorService: PromotionEditorService,
              private promotionService: PromotionService,
              private translateService: TranslateService,
              private confirmationService: ConfirmationService,
              public contextmenuService: ContextmenuService,
              private windowResizeListenerService: WindowResizeListenerService
  ) {
    this.windowResizeListenerService.screenWidthEmitter.subscribe(
      (screenWidthEmit: number) => {
        this.screenWidth = screenWidthEmit;
      }
    )
    contextmenuService.closeContextMenuEmitter.subscribe(exceptionId => {
      if(this.promotion.id !== exceptionId){
        this.contextMenu.hide();
      }
    })
  }

  ngOnInit(): void {
    this.screenWidth = this.windowResizeListenerService.getLastScreenWidth();
    this.promotionContextItems = [
      {
        label: this.translateService.instant('navigation.new'),
        command: () => {
          this.promotionEditorService.editPromotion({id: 0, title: '', description: '', startDate: Date.now(), endDate: Date.now()});
        }
      },
      {
        label: this.translateService.instant('navigation.edit'),
        command: () => {
          this.promotionEditorService.editPromotion(this.promotion);
        }
      },
      {
        label: this.translateService.instant('navigation.delete'),
        command: () => {
          this.confirmationService.confirm({
            message: this.translateService.instant('confirmation.delete.promotion'),
            accept: () => {
              this.promotionService.deletePromotion(this.promotion.id).subscribe(() => {
                  this.deletePromotion.emit(this.promotion.id);
                },
                (error => {}))
            }
          });
        }
      }
    ];
  }

  expand(){
    if(this.screenWidth < 992 && this.newPromotion){
      this.expandDownwards();
    }else{
      this.expandSideways();
    }
  }
  expandDownwards(){
    this.expanded = !this.expanded;
    this.showDescription = !this.showDescription;
  }
  expandSideways(){
    if(!this.animationTimeout){
      if(this.expanded == false){
        this.expanded = true;
        this.renderer2.setStyle(this.imageContainer.nativeElement, 'width', this.containerElement.nativeElement.offsetWidth + 'px');
        this.animationTimeout = setTimeout(() => {
          this.showDescription = true;
          window.scrollTo({top: this.containerElement.nativeElement.offsetTop, behavior: 'smooth'});
          clearTimeout(this.animationTimeout);
          this.animationTimeout = null;
        }, 1000)
      }else {
        this.expanded = false;
        this.showDescription = false;
        this.animationTimeout = setTimeout(() => {
          this.renderer2.setStyle(this.imageContainer.nativeElement, 'width', '100%');
          clearTimeout(this.animationTimeout);
          this.animationTimeout = null;
        }, 1000)
      }
    }
  }
}
