import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product";
import {MenuItem} from "primeng";
import {ProductService} from "../../services/product.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  @Output() deleteProduct = new EventEmitter();

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
          console.log(this.product.id);
          this.productService.deleteProduct(this.product.id).subscribe(() => {
            this.deleteProduct.emit(this.product.id);
          },
            (error => {}))
        }
      }
    ]
  }

}
