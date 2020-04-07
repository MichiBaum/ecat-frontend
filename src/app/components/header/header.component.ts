import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {WindowResizeListenerService} from "../../services/window-resize-listener.service";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {}

}
