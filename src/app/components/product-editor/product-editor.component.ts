import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ConfirmationService, SelectItem} from "primeng";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ProductFamily} from "../../models/product-family";
import {ProductTypesService} from "../../services/product-types.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  productItems: SelectItem[] = [{label: 'New', value: {id: 0, name: '', description: '', articleNr: '', pictureName: '', price: null}}];
  selectedProduct: Product;
  productFamilyItems: SelectItem[] = [];

  productForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    productFamilyId: new FormControl(),
    description: new FormControl(),
    articleNr: new FormControl(),
    price: new FormControl()
  });

  constructor(private productService: ProductService, private productTypesService: ProductTypesService, private confirmService: ConfirmationService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      data.forEach(product => {
        this.productItems.push(this.convertProductToSelectItem(product));
      })
    });
    this.productTypesService.getFamilies().subscribe(data => {
      data.forEach(productFamily => {
        this.productFamilyItems.push(this.convertProductFamilyToSelectItem(productFamily));
      })
    });
  }
  updateForm(){
    this.productForm.patchValue(this.selectedProduct);
  }
  saveProduct() {
    this.productService.saveProduct(this.productForm.getRawValue()).subscribe(data => {
      if (this.selectedProduct.id !== data.id) {
        this.productItems.push(this.convertProductToSelectItem(data));
      } else {
        Object.assign(this.selectedProduct, data);
        this.productItems.find(item => item.value.id === data.id).label = data.name;
      }
      this.selectedProduct = {id: 0, name: '', description: '', articleNr: '', pictureName: '', price: null};
      this.updateForm();
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
          this.updateForm();
        },
          (error => {}));
      }
    })
  }

  resetFormToLastState() {
    this.productForm.patchValue(this.selectedProduct);
  }

  private convertProductToSelectItem(product: Product): SelectItem{
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
