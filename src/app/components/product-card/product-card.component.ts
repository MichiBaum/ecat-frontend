import {
  Component, ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output, Renderer2, ViewChild,
} from '@angular/core';
import {Product} from "../../models/product";
import {MenuItem} from "primeng";
import {ProductService} from "../../services/product.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @HostBinding('class.p-col-12') expandedClass = false;
  @HostBinding('class.p-sm-6') breakPointClassSm = true;
  @HostBinding('class.p-md-6') breakPointClassMd = true;
  @HostBinding('class.p-lg-3') breakPointClassLg = true;
  @HostBinding('class.p-xl-3') breakPointClassXl = true;
  @Input() product: Product;
  @Output() deleteProduct = new EventEmitter();
  @ViewChild('container') containerElement: ElementRef;
  @ViewChild('imageContainer') imageContainer: ElementRef;
  expanded: boolean = false;

  productContextItems: MenuItem[];

  constructor(private productService: ProductService, public authService: AuthenticationService, private renderer2: Renderer2) {
  }

  ngOnInit(): void {
    this.productContextItems = [
      {
        label: "Neu",
        routerLink: "../admin/productEditor"
      },
      {
        label: "Bearbeiten",
        routerLink: "../admin/productEditor"
      },
      {
        label: "Löschen",
        command: () => {
          this.productService.deleteProduct(this.product.id).subscribe(() => {
            this.deleteProduct.emit(this.product.id);
          },
            (() => {}))
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
    this.expandedClass = this.expanded;
    this.breakPointClassSm = !this.expanded;
    this.breakPointClassMd = !this.expanded;
    this.breakPointClassLg = !this.expanded;
    this.breakPointClassXl = !this.expanded;
  }

}
