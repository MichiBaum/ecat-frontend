import {Component, HostListener, OnInit} from '@angular/core';
import {WindowResizeListenerService} from "./services/window-resize-listener.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private windowResizeListenerService: WindowResizeListenerService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowResizeListenerService.screenWidthEmitter.emit(event.target.innerWidth);
    this.windowResizeListenerService.screenHeightEmitter.emit(event.target.innerHeight);
    console.log("Window res")
  }

  ngOnInit(){
    this.windowResizeListenerService.screenWidthEmitter.emit(window.innerWidth);
    this.windowResizeListenerService.screenHeightEmitter.emit(window.innerHeight);
    console.log("Win siz");
  }

}
