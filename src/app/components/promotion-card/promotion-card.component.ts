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
import {MenuItem} from "primeng";
import {PromotionEditorService} from "../../services/promotion-editor.service";
import {PromotionService} from "../../services/promotion.service";

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
              private promotionService: PromotionService) { }

  ngOnInit(): void {
    this.promotionContextItems = [
      {
        label: "Neu",
        command: () => {
          this.promotionEditorService.editPromotion({id: 0, title: '', description: '', pictureName: '', startDate: Date.now(), endDate: Date.now()});
        }
      },
      {
        label: "Bearbeiten",
        command: () => {
          this.promotionEditorService.editPromotion(this.promotion);
        }
      },
      {
        label: "Löschen",
        command: () => {
          this.promotionService.deletePromotion(this.promotion.id).subscribe(() => {
              this.deletePromotion.emit(this.promotion.id);
            },
            (error => {}))
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
