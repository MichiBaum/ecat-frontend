import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {FileUpload} from "primeng";
import {CustomUploadItem} from "../../models/custom-upload-item";

@Component({
  selector: 'app-custom-upload',
  templateUrl: './custom-upload.component.html',
  styleUrls: ['./custom-upload.component.scss'],
  host: {
    class:'p-col'
  }
})
export class CustomUploadComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer) { }

  @Input()customUploadItems: CustomUploadItem[] = [];
  @Output()addedCustomUploadItem = new EventEmitter();
  @Output()listReorder = new EventEmitter();
  @Output()removedCustomUploadItem = new EventEmitter();
  @ViewChild('fileUpload') fileUpload: FileUpload;
  ngOnInit(): void {
  }

  updateCustomUploadItems(event){
    let files = event.files;
    for(let i = 0; i < files.length; i++){
      let customUploadItem: CustomUploadItem = {id: 0, file: files[i], index: this.customUploadItems.length}
      this.fileUpload.clear();
      this.addedCustomUploadItem.emit(customUploadItem);
    }
  }
  updateCustomUploadItemsIndex(){
    let updatedIndexes = new Map();
    for (let i = 0; i < this.customUploadItems.length; i++){
      let customUploadItem = this.customUploadItems[i];
      if(customUploadItem.index !== i){
        customUploadItem.index = i;
        updatedIndexes.set(customUploadItem.id, customUploadItem.index);
      }
    }
    this.listReorder.emit(updatedIndexes);
  }

  getUrl(file: File){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    return this.domSanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file)));
  }

  removeCustomUploadItem(customUploadItem: CustomUploadItem){
    let index = this.customUploadItems.indexOf(customUploadItem);
    this.customUploadItems.splice(index, 1);
    this.removedCustomUploadItem.emit(customUploadItem);
  }
}
