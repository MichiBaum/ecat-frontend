import {EventEmitter, Injectable, OnInit, Output} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class WindowResizeListenerService implements OnInit{

  @Output() screenWidthEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() screenHeightEmitter: EventEmitter<number> = new EventEmitter<number>();

  lastScreenWidth: number;
  lastScreenHeight: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  setLastScreenWidth(screenWidth: number){
    this.lastScreenWidth = screenWidth;
  }
  setLastScreenHeight(screenHeight: number){
    this.lastScreenHeight = screenHeight;
  }
  getLastScreenWidth(){
    return this.lastScreenWidth;
  }
  getLastScreenHeight(){
    return this.lastScreenHeight;
  }

}
