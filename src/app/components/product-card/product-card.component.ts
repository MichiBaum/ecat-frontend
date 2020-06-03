import {
  Component, ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output, Renderer2, ViewChild,
} from '@angular/core';
import {Product} from "../../models/product";
import {ConfirmationService, MenuItem} from "primeng";
import {ProductService} from "../../services/product.service";
import {AuthenticationService} from "../../services/authentication.service";
import {ProductEditorService} from "../../services/product-editor.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  expanded: boolean = false;
  @HostBinding('class.p-col-12') breakPointClassFullWidth = true;
  @Input() product: Product;
  @Input() classes: string;
  @Output() deleteProduct = new EventEmitter();
  @ViewChild('container') containerElement: ElementRef;
  @ViewChild('imageContainer') imageContainer: ElementRef;
  @HostBinding('class') get hostClasses(): string{
    return this.expanded ? 'p-col-12': this.classes;
  };
  productContextItems: MenuItem[];

  constructor(private productService: ProductService,
              private authService: AuthenticationService,
              private renderer2: Renderer2,
              private productEditorService: ProductEditorService,
              private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit(): void {
    this.productContextItems = [
      {
        label: "Neu",
        command: () => {
          this.productEditorService.editProduct({id: 0, name: '', description: '', articleNr: '', pictureName: '', price: null});
        }
      },
      {
        label: "Bearbeiten",
        command: () => {
          this.productEditorService.editProduct(this.product);
        }
      },
      {
        label: "Löschen",
        command: () => {
          this.confirmationService.confirm({
            message: 'Sind sie sicher, dass sie dieses Produkt löschen wolllen?',
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
    if(this.expanded == false){
      this.renderer2.setStyle(this.imageContainer.nativeElement, 'width', this.containerElement.nativeElement.offsetWidth + 'px');
      this.expanded = true;
    }else{
      this.renderer2.setStyle(this.imageContainer.nativeElement, 'width', '100%');
      this.expanded = false;
    }
  }

}
