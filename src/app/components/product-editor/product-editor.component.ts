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

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  product: Product = {id: 0, name: '', description: '', articleNr: '', pictureName: '', price: null};
  image: File;
  productFamilyItems: SelectItem[] = [];
  showDialog: boolean = false;

  productForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    productFamilyId: new FormControl(),
    description: new FormControl(),
    articleNr: new FormControl(),
    price: new FormControl(),
    image: new FormControl()
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
      this.updateForm();
    })

  }

  ngOnInit(): void {
    this.productTypesService.getFamilies().subscribe(data => {
      data.forEach(productFamily => {
        this.productFamilyItems.push(this.convertProductFamilyToSelectItem(productFamily));
      })
    });
  }
  updateForm(){
    this.productForm.patchValue(this.product);
  }
  updateImage(event){
    this.productForm.get('image').setValue(event.files[0]);
  }
  saveProduct() {
    this.productService.saveProduct(new SaveProductDto(this.productForm.getRawValue())).subscribe(data => {
      Object.assign(this.product, data);
      this.messageService.add({severity:'success', summary:this.translateService.instant('toastMessages.success'), detail:this.translateService.instant('productEditor.successfulSave')});
      const formData = new FormData();
      formData.append('image', this.productForm.get('image').value);
      this.productService.saveProductImage(formData, data.id).subscribe(() => {
        this.messageService.add({severity:'success', summary:this.translateService.instant('toastMessages.success'), detail:this.translateService.instant('productEditor.successfulImageSave')});
      },
        (error => {}))
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

}
