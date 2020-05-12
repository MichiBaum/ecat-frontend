import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  @Output() sideBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
}
