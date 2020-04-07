import { Component, OnInit } from '@angular/core';
import {ConfirmationService, SelectItem} from "primeng";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ProductFamily} from "../../models/product-family";
import {ProductTypesService} from "../../services/product-types.service";

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  products: Product[] = [];
  productItems: SelectItem[] = [{label: 'New', value: {id: 0, name: '', description: '', articleNr: '', pictureName: '', price: null}}];
  selectedProduct: Product = {id: 0, name: '', description: '', articleNr: '', pictureName: '', price: null};
  productFamilies: ProductFamily[] = [];
  productFamilyItems: SelectItem[] = [];

  constructor(private productService: ProductService, private productTypesService: ProductTypesService, private confirmService: ConfirmationService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.products.forEach(promotion => {
        this.productItems.push(this.convertPromotionToSelectItem(promotion));
      })
    });
    this.productTypesService.getFamilies().subscribe(data => {
      this.productFamilies = data;
      this.productFamilies.forEach(productFamily => {
        this.productFamilyItems.push(this.convertProductFamilyToSelectItem(productFamily));
      })
    });

  }

  saveProduct() {
    this.productService.saveProduct(this.selectedProduct).subscribe(data => {
      if (this.selectedProduct.id !== data.id) {
        this.products.push(data);
        this.productItems.push(this.convertPromotionToSelectItem(data));
      } else {
        Object.assign(this.selectedProduct, data);
        this.productItems.find(item => item.value.id === data.id).label = data.name;
      }
      this.selectedProduct = {id: 0, name: '', description: '', articleNr: '', pictureName: '', price: null};
    },
      (error => {}))
  }

  deleteProduct(productId: number) {
    this.confirmService.confirm({
      message: 'Are you sure you want to delete this product',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe(() => {
          this.selectedProduct = {id: 0, name: '', description: '', articleNr: '', pictureName: '', price: null};
          this.productItems.splice(this.productItems.findIndex(item => item.value.id === productId), 1);
        },
          (error => {}));
      }
    })
  }

  resetFormToLastState() {
  }

  private convertPromotionToSelectItem(product: Product): SelectItem{
    return {
      label: product.name,
      value: product
    }
  }
  private convertProductFamilyToSelectItem(productFamily: ProductFamily): SelectItem{
    return {
      label: productFamily.name,
      value: productFamily.id
    }
  }

}
