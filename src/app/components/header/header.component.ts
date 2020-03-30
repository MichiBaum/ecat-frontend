import {Component, HostListener, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  screenSize: number;

  constructor(public authenticationService: AuthenticationService) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenSize = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.screenSize = window.innerWidth;

  }

}
