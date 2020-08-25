import {Component} from '@angular/core';
import {WindowResizeListenerService} from "../../services/window-resize-listener.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  screenWidth: number;

  constructor(private windowResizeListenerService: WindowResizeListenerService) {
    this.windowResizeListenerService.screenWidthEmitter.subscribe(
      (screenWidthEmit: number) => {
        this.screenWidth = screenWidthEmit;
      }
    )
  }
}
