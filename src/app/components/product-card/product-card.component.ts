import {Component, Input, OnInit, Output} from '@angular/core';
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

  productCardContextItems: MenuItem[];

  constructor(private productService: ProductService, public authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.productCardContextItems = [
      {
        label: "New",
        routerLink: "../admin/promotionEditor"
      },
      {
        label: "Edit",
        routerLinkActiveOptions: "../admin/promotionEditor"
      },
      {
        label: "Delete",
        command: () => {
          this.productService.deleteProduct(this.product.id); //TODO remove Product from List
        }
      }
    ]
  }

}
