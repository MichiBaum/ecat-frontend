import {
  Component,
  EventEmitter,
  Input,
  IterableDiffer,
  IterableDiffers,
  Output, SecurityContext,
  ViewChild
} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {FileUpload, MessageService} from "primeng";
import {CustomUploadItem} from "../../models/custom-upload-item";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-custom-upload',
  templateUrl: './custom-upload.component.html',
  styleUrls: ['./custom-upload.component.scss'],
})
export class CustomUploadComponent {

  constructor(
    private domSanitizer: DomSanitizer,
    private iterableDiffers: IterableDiffers,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);

  }

  iterableDiffer: IterableDiffer<CustomUploadItem>;
  @Input()customUploadItems: CustomUploadItem[] = [];
  @Output()newCustomUploadItem = new EventEmitter();
  @Output()listReorder = new EventEmitter();
  @Output()removedCustomUploadItem = new EventEmitter();
  @ViewChild('fileUpload') fileUpload: FileUpload;

  emitNewCustomUploadItems(event){
    let files = event.files;
    for(let i = 0; i < files.length; i++){
      if(this.validateFile(files[i])){
        let customUploadItem: CustomUploadItem = {id: 0, file: files[i], index: this.getIndex(), fileName: files[i].name};
        this.newCustomUploadItem.emit(customUploadItem);
      }
    }
    this.fileUpload.clear();
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

  private getIndex(){
    let highestIndex = Math.max.apply(Math, this.customUploadItems.map(function(customUploadItem) { return customUploadItem.index; }));
    if(!isNaN(highestIndex) && isFinite(highestIndex)){
      return highestIndex + 1;
    }
    return 0;
  }

  openImagePreview(customUploadItem: CustomUploadItem){
    window.open(this.domSanitizer.sanitize(SecurityContext.URL, customUploadItem.url), '_blank');
  }

  private validateFile(file: File): boolean{
    let valid = true;
    if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
      this.messageService.add({
        severity:'error',
        summary:this.translateService.instant('toastMessages.error'),
        detail:this.translateService.instant('errors.customUpload.invalidFileType')});
      valid = false;
    }
    if(file.size > 10000000){
      this.messageService.add({
        severity:'error',
        summary:this.translateService.instant('toastMessages.error'),
        detail:this.translateService.instant('errors.customUpload.invalidFileSize')});
      valid = false;
    }
    return valid;
  }
}
