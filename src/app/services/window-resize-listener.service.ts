import {EventEmitter, HostListener, Injectable, OnInit, Output} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class WindowResizeListenerService implements OnInit{

  @Output() screenSizeEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
