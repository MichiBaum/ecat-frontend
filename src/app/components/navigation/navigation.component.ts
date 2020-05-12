import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductTypesService} from "../../services/product-types.service";
import {ProductGroup} from "../../models/product-group";
import {ProductClass} from "../../models/product-class";
import {ProductFamily} from "../../models/product-family";
import {Router} from "@angular/router";
import {WindowResizeListenerService} from "../../services/window-resize-listener.service";
import {ProductService} from "../../services/product.service";
import {ProductType} from "../../models/product-type.enum";
import {NavigationService} from "../../services/navigation.service";
import {CustomMenuItem} from "../../models/customMenuItem";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @ViewChild('slideMenuContainer') slideMenuContainer: ElementRef;

  testItem: CustomMenuItem = {items: []};
  productGroups: ProductGroup[] = [];
  screenWidth: number;
  screenHeight: number;
  searchtext: string;
  displaySideBar: boolean = false;

  constructor(
    private productTypesService: ProductTypesService,
    private router: Router,
    private windowResizeListenerService: WindowResizeListenerService,
    private productService: ProductService,
    private navigationService: NavigationService
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
      this.testItem = {items: []};
      this.productGroups.forEach(productGroup => {
        this.testItem.items.push(this.convertProductGroupToTreenode(productGroup));
      });
    })
  }

  private convertProductGroupToTreenode(productGroup: ProductGroup): CustomMenuItem{
    let items: CustomMenuItem[] = [];
    productGroup.productClasses.forEach(productClass => {
        items.push(this.convertProductClassToTreenode(productClass));
      }
    );
    return {
      label: productGroup.name,
      command: () =>{
        this.searchProducts(ProductType.PRODUCT_GROUP, productGroup.id);
      },
      items: items
    }
  }

  private convertProductClassToTreenode(productClass: ProductClass): CustomMenuItem{
    let items: CustomMenuItem[] = [];
    productClass.productFamilies.forEach(productFamily => {
        items.push(this.convertProductFamilyToTreenode(productFamily));
      }
    );
    return {
      label: productClass.name,
      command: () =>{
        this.searchProducts(ProductType.PRODUCT_CLASS, productClass.id);
      },
      items: items
    }
  }

  private convertProductFamilyToTreenode(productFamily: ProductFamily): CustomMenuItem{
    return{
      label: productFamily.name,
      command: () =>{
        this.searchProducts(ProductType.PRODUCT_FAMILY, productFamily.id);
      }
    }
  }

  searchProducts(productType: ProductType, id: number) {
    switch (productType) {
      case ProductType.PRODUCT_CLASS:
        this.productService.searchProductClass(id, true);
        break;
      case ProductType.PRODUCT_FAMILY:
        this.productService.searchProductFamily(id, true);
        break;
      case ProductType.PRODUCT_GROUP:
        this.productService.searchProductGroup(id, true);
        break;
    }
  }

  onSearch(event: KeyboardEvent) {
    if(event.key === "Enter" || this.searchtext?.length > 4){
      this.productService.search(this.searchtext || "", true)
    }
  }
}
