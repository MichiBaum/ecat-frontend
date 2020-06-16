import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  host: {
    class:'p-col'
  }
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService, public authService: AuthenticationService) {
    this.productService.products.subscribe(
      (products) => this.products = products
    )
  }

  ngOnInit(): void {

  }

  onDeleteProduct(productId: number){
    this.products.splice(this.products.findIndex(product => product.id == productId), 1);
  }

}
