import {Component, Input, OnInit} from '@angular/core';
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
        routerLinkActiveOptions: "../admin/productEditor"
      },
      {
        label: "Löschen",
        routerLink: "../admin/productEditor"
      }
    ]
  }

}
