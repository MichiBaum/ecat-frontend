import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, Dropdown, MessageService, SelectItem} from "primeng";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ProductFamily} from "../../models/product-family";
import {ProductTypesService} from "../../services/product-types.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductEditorService} from "../../services/product-editor.service";
import {TranslateService} from "@ngx-translate/core";
import {SaveProductDto} from "../../models/save-product-dto";
import {SaveProductImageDto} from "../../models/save-product-image-dto";
import {CustomUploadItem} from "../../models/custom-upload-item";

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  @ViewChild('dropdown') dropdown: Dropdown;
  product: Product = new Product();
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
      if(!product.returnProductImageDtos){
        this.product.returnProductImageDtos = [];
      }
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
    this.productService.saveProduct(new SaveProductDto(this.productForm.getRawValue())).subscribe(product => {
      if(this.product.id == 0 || !this.product.id){
        Object.assign(this.product, product);
        this.productService.addNewProduct(this.product);
      }else{
        Object.assign(this.product, product);
      }
      this.messageService.add({
        severity:'success',
        summary:this.translateService.instant('toastMessages.success'),
        detail:this.translateService.instant('productEditor.successfulSave')
      });
      this.updateProductForm();
    },
      () => {})
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

  updateProductImagesIndex(updatedIndexes: any){
    for (let [key, value] of updatedIndexes){
      let returnProductImageDto = this.product.returnProductImageDtos.find(saveProductImageDto => saveProductImageDto.id === key);
      this.productService.saveProductImageIndex(returnProductImageDto.id, value).subscribe(() => {}, () => {});
    }
  }

  saveNewProductImage(saveProductImageDto: SaveProductImageDto){
    this.productService.saveProductImage(saveProductImageDto).subscribe(returnProductImageDto => {
      if(saveProductImageDto.id && saveProductImageDto.id !== 0) {
        let originalReturnProductImageDto = this.product.returnProductImageDtos.find(
          returnProductImageDtoPredicate => returnProductImageDtoPredicate.id === saveProductImageDto.id);
        Object.assign(originalReturnProductImageDto, returnProductImageDto);
      }else{
        this.product.returnProductImageDtos.push(returnProductImageDto);
      }
    },
      () => {})
  }

  deleteProductImage(id: number){
    this.productService.deleteProductImage(id).subscribe(() => {
      let returnProductImageDtoIndex = this.product.returnProductImageDtos.findIndex(
        returnProductImageDtoPredicate => returnProductImageDtoPredicate.id === id);
      this.product.returnProductImageDtos.splice(returnProductImageDtoIndex, 1);
    }, () => {});
  }

  customUploadItemToSaveProductImageDto(customUploadItem: CustomUploadItem): SaveProductImageDto{
    return {
      id: customUploadItem.id,
      index: customUploadItem.index,
      file: customUploadItem.file,
      fileName: customUploadItem.fileName,
      productId: this.product.id
    };
  }
}
