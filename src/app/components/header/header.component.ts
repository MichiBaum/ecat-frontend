import {Component, HostListener, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {WindowResizeListenerService} from "../../services/window-resize-listener.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  screenSize: number;

  constructor(public authenticationService: AuthenticationService, private windowResizeListenerService: WindowResizeListenerService) {
    this.windowResizeListenerService.screenSizeEmitter.subscribe(
      (screenSizeEmit: number) => {
        this.screenSize = screenSizeEmit;
      }
    )
  }

  ngOnInit(): void {
  }

}
