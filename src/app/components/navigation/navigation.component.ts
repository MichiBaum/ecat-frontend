import {Component, OnInit} from '@angular/core';
import {ProductTypesService} from "../../services/product-types.service";
import {ProductGroup} from "../../models/product-group";
import {ProductClass} from "../../models/product-class";
import {ProductFamily} from "../../models/product-family";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowResizeListenerService} from "../../services/window-resize-listener.service";
import {ProductService} from "../../services/product.service";
import {NavigationService} from "../../services/navigation.service";
import {CustomMenuItem} from "../../models/customMenuItem";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  menuItem: CustomMenuItem = {items: []};
  productGroups: ProductGroup[] = [];
  screenWidth: number;
  screenHeight: number;
  searchText: string;
  displaySideBar: boolean = false;

  constructor(
    private productTypesService: ProductTypesService,
    private router: Router,
    private windowResizeListenerService: WindowResizeListenerService,
    private productService: ProductService,
    private navigationService: NavigationService,
  ) {
    this.windowResizeListenerService.screenWidthEmitter.subscribe(
      (screenWidthEmit: number) => {
        this.screenWidth = screenWidthEmit;
      }
    );
    this.windowResizeListenerService.screenHeightEmitter.subscribe(
      (screenHeightEmit: number)=>{
        this.screenHeight = screenHeightEmit;
    });
    this.navigationService.sideBarEmitter.subscribe(
      (displaySideBarEmit)=>{
        this.displaySideBar = displaySideBarEmit;
      }
    );
  }

  ngOnInit(): void {
    this.productTypesService.getGroups().subscribe(data => {
      this.productGroups = data;
      this.menuItem = {items: []};
      this.productGroups.forEach(productGroup => {
        this.menuItem.items.push(this.convertProductGroupToTreenode(productGroup));
      });
    })
  }

  private convertProductGroupToTreenode(productGroup: ProductGroup): CustomMenuItem{
    let items: CustomMenuItem[] = [];
    let productGroupUrl = this.getUrlString(productGroup);
    productGroup.productClasses.forEach(productClass => {
        items.push(this.convertProductClassToTreenode(productClass, productGroupUrl));
      }
    );
    return {
      label: productGroup.name,
      command: () =>{
        this.router.navigate(['products', productGroupUrl])
      },
      items: items
    }
  }

  private convertProductClassToTreenode(productClass: ProductClass, productGroupUrl: string): CustomMenuItem{
    let items: CustomMenuItem[] = [];
    let productClassUrl = this.getUrlString(productClass);
    productClass.productFamilies.forEach(productFamily => {
        items.push(this.convertProductFamilyToTreenode(productFamily, productGroupUrl, productClassUrl));
      }
    );
    return {
      label: productClass.name,
      command: () =>{
        this.router.navigate(['products/', productGroupUrl, productClassUrl])
      },
      items: items
    }
  }

  private convertProductFamilyToTreenode(productFamily: ProductFamily, productGroupUrl: string, productClassUrl: string): CustomMenuItem{
    return{
      label: productFamily.name,
      command: () =>{
        this.router.navigate(['products/', productGroupUrl, productClassUrl, this.getUrlString(productFamily)])
      }
    }
  }

  onSearch(event: KeyboardEvent) {
    if(event.key === "Enter" || this.searchText?.length > 4){
      this.productService.search(this.searchText || "", true)
    }
  }

  private getUrlString(productTypeObject: any){
    let replacedString = productTypeObject.name.replace(/ /g, '-');

    return replacedString + '-' + productTypeObject.id;
  }
}
