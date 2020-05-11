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

  screenSize: any;
  searchtext: string;

  constructor(
    public authenticationService: AuthenticationService,
    public windowResizeListenerService: WindowResizeListenerService,
    private productService: ProductService
  ) {
    this.windowResizeListenerService.screenSizeEmitter.subscribe(
      (screenSizeEmit: number) => {
        this.screenSize = screenSizeEmit;
      }
    )
  }

  ngOnInit(): void {
  }
  onSearch(event: KeyboardEvent) {
    if(event.key === "Enter" || this.searchtext?.length > 4){
      this.productService.search(this.searchtext || "", true)
    }
  }
}
