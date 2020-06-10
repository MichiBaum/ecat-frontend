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
import {ConfirmationService, MenuItem} from "primeng";
import {PromotionEditorService} from "../../services/promotion-editor.service";
import {PromotionService} from "../../services/promotion.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-promotion-card',
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.scss'],

})
export class PromotionCardComponent implements OnInit {
  expanded: boolean = false;
  @Input() promotion: Promotion;
  @Input() classes: string;
  @Output() deletePromotion = new EventEmitter();
  @ViewChild('container') containerElement: ElementRef;
  @ViewChild('imageContainer') imageContainer: ElementRef;
  @HostBinding('class') get hostClasses(): string{
    return this.expanded ? 'p-col-12': this.classes;
  };
  promotionContextItems: MenuItem[];

  constructor(private renderer2: Renderer2,
              public authService: AuthenticationService,
              private promotionEditorService: PromotionEditorService,
              private promotionService: PromotionService,
              private translateService: TranslateService,
              private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.promotionContextItems = [
      {
        label: this.translateService.instant('navigation.new'),
        command: () => {
          this.promotionEditorService.editPromotion({id: 0, title: '', description: '', pictureName: '', startDate: Date.now(), endDate: Date.now()});
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
    if(this.expanded == false){
      this.renderer2.setStyle(this.imageContainer.nativeElement, 'width', this.containerElement.nativeElement.offsetWidth + 'px');
      this.expanded = true;
    }else{
      this.renderer2.setStyle(this.imageContainer.nativeElement, 'width', '100%');
      this.expanded = false;
    }
  }

}
