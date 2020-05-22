import {EventEmitter, Injectable, Output} from '@angular/core';
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductEditorService {

  constructor() { }

  @Output() productEmitter: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() showProductEditorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  editProduct(product: Product){
    this.productEmitter.emit(product);
    this.showProductEditorEmitter.emit(true);
  }

}
