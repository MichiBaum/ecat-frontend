import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {AuthenticationService} from "../../services/authentication.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ProductEditorService} from "../../services/product-editor.service";

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
  currentRouteParams: Params;

  constructor(private productService: ProductService,
              public authService: AuthenticationService,
              private route: ActivatedRoute,
              private productEditorService: ProductEditorService) {
    this.productService.products.subscribe(
      (products) => this.products = products
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentRouteParams = params;
      this.searchProducts(params);
    })
  }

  onDeleteProduct(productId: number){
    this.products.splice(this.products.findIndex(product => product.id == productId), 1);
  }

  searchProducts(urlParams: Params) {
    if(urlParams['productFamily']){
      this.productService.searchProductFamily(this.getIdFromUrlParams(urlParams['productFamily']), false);
      return;
    }
    if(urlParams['productClass']){
      this.productService.searchProductClass(this.getIdFromUrlParams(urlParams['productClass']), false);
      return;
    }
    if(urlParams['productGroup']){
      this.productService.searchProductGroup(this.getIdFromUrlParams(urlParams['productGroup']), false);
      return;
    }
  }

  private getIdFromUrlParams(productTypeString: string): number{
    let splitString = productTypeString.split('-');
    let parsedId = parseInt(splitString[splitString.length - 1]);
    if(isNaN(parsedId)){
      return 0;
    }else{
      return parsedId;
    }
  }

  createNewProduct(){
    let productFamilyId = 0;
    if(this.currentRouteParams['productFamily']){
      productFamilyId = this.getIdFromUrlParams(this.currentRouteParams['productFamily']);
    }
    this.productEditorService.editProduct(new Product(undefined, undefined, undefined, undefined, undefined, productFamilyId));
  }

}
