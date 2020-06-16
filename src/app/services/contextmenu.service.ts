import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextmenuService {

  @Output() closeContextMenuEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  closeAllExcept(id: number){
    this.closeContextMenuEmitter.emit(id);
  }
}
