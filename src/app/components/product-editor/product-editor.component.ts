import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService, SelectItem} from "primeng";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ProductFamily} from "../../models/product-family";
import {ProductTypesService} from "../../services/product-types.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductEditorService} from "../../services/product-editor.service";
import {TranslateService} from "@ngx-translate/core";
import {SaveProductDto} from "../../models/save-product-dto";
import {ProductImage} from "../../models/product-image";
import {CustomUploadItem} from "../../models/custom-upload-item";

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  product: Product = {id: 0, name: '', description: '', articleNr: '', price: null};
  productImages: ProductImage[] = [];
  customUploadItems: CustomUploadItem[] = [];
  productFamilyItems: SelectItem[] = [];
  showDialog: boolean = false;

  productForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    productFamilyId: new FormControl(),
    description: new FormControl(),
    articleNr: new FormControl(),
    price: new FormControl(),
  });

  constructor(private productService: ProductService,
              private productTypesService: ProductTypesService,
              private confirmService: ConfirmationService,
              private productEditorService: ProductEditorService,
              private messageService: MessageService,
              private translateService: TranslateService)
  {
    this.productEditorService.showProductEditorEmitter.subscribe(showDialog => {
      this.showDialog = showDialog;
    });
    this.productEditorService.productEmitter.subscribe(product => {
      this.product = product;
      this.updateProductForm();
    })

  }

  ngOnInit(): void {
    this.productTypesService.getFamilies().subscribe(data => {
      data.forEach(productFamily => {
        this.productFamilyItems.push(this.convertProductFamilyToSelectItem(productFamily));
      })
    });
  }
  updateProductForm(){
    this.productForm.patchValue(this.product);
  }
  saveProduct() {
    this.productService.saveProduct(new SaveProductDto(this.productForm.getRawValue())).subscribe(data => {
      Object.assign(this.product, data);
      this.messageService.add({
        severity:'success',
        summary:this.translateService.instant('toastMessages.success'),
        detail:this.translateService.instant('productEditor.successfulSave')});
    },
      (error => {}))
  }

  resetFormToLastState() {
    this.productForm.patchValue(this.product);
  }

  private convertProductFamilyToSelectItem(productFamily: ProductFamily): SelectItem{
    return {
      label: productFamily.name,
      value: productFamily.id
    }
  }

  private productImageToFormData(productImage: ProductImage): FormData{
    const formData = new FormData();
    formData.append('image', productImage.image);
    formData.append('id', JSON.stringify(productImage.id));
    formData.append('imageName', JSON.stringify(productImage.imageName));
    formData.append('index', JSON.stringify(productImage.index));
    formData.append('productId', JSON.stringify(productImage.productId));
    return formData;
  }

  updateProductImagesIndex(updatedIndexes: any){
    for (let [key, value] of updatedIndexes){
      let productImage = this.productImages.find(productImage => productImage.id == key);
      productImage.index = value;
      this.productService.saveProductImageIndex(productImage).subscribe(() => {}, error => {});
    }
  }

  saveNewProductImage(productImageToSave: ProductImage){
    this.productService.saveProductImage(this.productImageToFormData(productImageToSave)).subscribe(productImage => {
      productImage.image = productImageToSave.image;
      if(productImageToSave.id && productImage.id  !== 0){
        let originalProductImage = this.productImages.find(productImage => productImage.id === productImageToSave.id);
        Object.assign(originalProductImage, productImage);
      }else{
        this.productImages.push(productImage);
        this.customUploadItems.push(this.productImageToCustomUploadItem(productImage));
      }
    },
      error => {})
  }

  private customUploadItemToProductImage(customUploadItem: CustomUploadItem): ProductImage{
    return {
      id: customUploadItem.id,
      index: customUploadItem.index,
      image: customUploadItem.file,
      imageName: customUploadItem.file.name,
      productId: this.product.id
    };
  }

  private productImageToCustomUploadItem(productImage: ProductImage): CustomUploadItem{
    return {
      id: productImage.id,
      file: productImage.image,
      index: productImage.index
    }
  }

}
