import {
  Component, ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output, Renderer2, ViewChild,
} from '@angular/core';
import {Product} from "../../models/product";
import {ConfirmationService, ContextMenu, MenuItem} from "primeng";
import {ProductService} from "../../services/product.service";
import {AuthenticationService} from "../../services/authentication.service";
import {ProductEditorService} from "../../services/product-editor.service";
import {TranslateService} from "@ngx-translate/core";
import {ContextmenuService} from "../../services/contextmenu.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  expanded: boolean = false;
  showDescription: boolean = false;
  loading: boolean = true;
  animationTimeout;
  @Input() product: Product;
  @Input() classes: string;
  @Output() deleteProduct = new EventEmitter();
  @ViewChild('container') containerElement: ElementRef;
  @ViewChild('imageContainer') imageContainer: ElementRef;
  @ViewChild('contextMenu') contextMenu: ContextMenu;
  @HostBinding('class') get hostClasses(): string{
    return this.expanded ? 'p-col-12': this.classes;
  };
  productContextItems: MenuItem[];

  constructor(private productService: ProductService,
              public authService: AuthenticationService,
              private renderer2: Renderer2,
              private productEditorService: ProductEditorService,
              private confirmationService: ConfirmationService,
              private translateService: TranslateService,
              public contextmenuService: ContextmenuService,
  ) {
    contextmenuService.closeContextMenuEmitter.subscribe(exceptionId => {
      if(this.product.id !== exceptionId){
        this.contextMenu.hide();
      }
    })
  }

  ngOnInit(): void {
    this.productContextItems = [
      {
        label: this.translateService.instant('navigation.new'),
        command: () => {
          this.productEditorService.editProduct({id: 0, name: '', description: '', articleNr: '', price: null});
        }
      },
      {
        label: this.translateService.instant('navigation.edit'),
        command: () => {
          this.productEditorService.editProduct(this.product);
        }
      },
      {
        label: this.translateService.instant('navigation.delete'),
        command: () => {
          this.confirmationService.confirm({
            message: this.translateService.instant('confirmation.delete.product'),
            accept: () => {
              this.productService.deleteProduct(this.product.id).subscribe(() => {
                  this.deleteProduct.emit(this.product.id);
                },
                (error => {}))
            }
          });
        }
      }
    ];
  }

  expand(){
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
