import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {WindowResizeListenerService} from "../../services/window-resize-listener.service";
import {ProductService} from "../../services/product.service";
import {NavigationService} from "../../services/navigation.service";
import {AdminEditorService} from "../../services/admin-editor.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  screenWidth: any;
  searchtext: string;

  constructor(
    public authenticationService: AuthenticationService,
    private windowResizeListenerService: WindowResizeListenerService,
    private productService: ProductService,
    public navigationService: NavigationService,
    public adminEditorService: AdminEditorService
  ) {
    this.windowResizeListenerService.screenWidthEmitter.subscribe(
      (screenWidthEmit: number) => {
        this.screenWidth = screenWidthEmit;
      }
    )
  }

  onSearch(event: KeyboardEvent) {
    if(event.key === "Enter" || this.searchtext?.length > 4){
      this.productService.search(this.searchtext || "", true)
    }
  }
}
