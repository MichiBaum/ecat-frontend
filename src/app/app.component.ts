import {Component, HostListener} from '@angular/core';
import {WindowResizeListenerService} from "./services/window-resize-listener.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private windowResizeListenerService: WindowResizeListenerService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowResizeListenerService.screenSizeEmitter.emit(event.target.innerWidth);
    console.log("Window res")
  }

  ngOnInit(): void {
    this.windowResizeListenerService.screenSizeEmitter.emit(window.innerWidth);
    console.log("Win siz")
  }

}
