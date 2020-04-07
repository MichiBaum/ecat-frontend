import {Component, OnInit} from '@angular/core';
import {WindowResizeListenerService} from "../../services/window-resize-listener.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  screenSize: number;

  constructor(private windowResizeListenerService: WindowResizeListenerService) {
    this.windowResizeListenerService.screenSizeEmitter.subscribe(
      (screenSizeEmit: number) => {
        this.screenSize = screenSizeEmit;
      }
    )
  }

  ngOnInit(): void {
  }

}
