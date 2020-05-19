import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
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
  @HostBinding('class.p-md-3') breakPointClassMd = true;
  @HostBinding('class.p-lg-3') breakPointClassLg = true;
  @HostBinding('class.p-xl-3') breakPointClassXl = true;
  @Input() product: Product;
  @Output() deleteProduct = new EventEmitter();
  expanded: boolean = false;

  productContextItems: MenuItem[];

  constructor(private productService: ProductService, public authService: AuthenticationService) {
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
    ]
  }

  expand(){
    if(this.expanded == false){
      this.expanded = true;
    }else{
      this.expanded = false;
    }
    this.expandedClass = this.expanded;
    this.breakPointClassSm = !this.expanded;
    this.breakPointClassMd = !this.expanded;
    this.breakPointClassLg = !this.expanded;
    this.breakPointClassXl = !this.expanded;
  }

}
