import { Component, OnInit } from '@angular/core';
import {Product} from "../../classes/product";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    },
      (error => {
        console.log(error.status);
      })
    )
  }
  onDeletedProduct(productId: number){
    this.products.splice(this.products.findIndex(product => product.id === productId), 1);
  }

}
