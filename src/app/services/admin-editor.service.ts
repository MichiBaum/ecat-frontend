import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminEditorService {

  constructor() { }

  @Output() showAdminEditorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  editUser(){
    this.showAdminEditorEmitter.emit(true);
  }
}
