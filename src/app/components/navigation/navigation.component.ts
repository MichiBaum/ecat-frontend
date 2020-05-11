import {Component, OnInit} from '@angular/core';
import {ProductTypesService} from "../../services/product-types.service";
import {ProductGroup} from "../../models/product-group";
import {ProductClass} from "../../models/product-class";
import {ProductFamily} from "../../models/product-family";
import {Router} from "@angular/router";
import {WindowResizeListenerService} from "../../services/window-resize-listener.service";
import {ProductService} from "../../services/product.service";
import {ProductType} from "../../models/product-type.enum";
import {MenuItem} from "primeng";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  sideBarVisible = false;
  menuItems: MenuItem[] =[];
  productGroups: ProductGroup[] = [];
  screenSize: number;
  searchtext: string;

  constructor(
    private productTypesService: ProductTypesService,
    private router: Router,
    private windowResizeListenerService: WindowResizeListenerService,
    private productService: ProductService
  ) {
    this.windowResizeListenerService.screenSizeEmitter.subscribe(
      (screenSizeEmit: number) => {
        this.screenSize = screenSizeEmit;
      }
    )
  }

  ngOnInit(): void {
    this.productTypesService.getGroups().subscribe(data => {
      this.productGroups = data;
        this.productGroups.forEach(productGroup => {
          this.menuItems.push(this.convertProductGroupToTreenode(productGroup));
        });
    })
  }

  private convertProductGroupToTreenode(productGroup: ProductGroup): MenuItem{
    let items: MenuItem[] = [];
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

  private convertProductClassToTreenode(productClass: ProductClass): MenuItem{
    let items: MenuItem[] = [];
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

  private convertProductFamilyToTreenode(productFamily: ProductFamily): MenuItem{
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
        this.sideBarVisible = false;
        break;
      case ProductType.PRODUCT_FAMILY:
        this.productService.searchProductFamily(id, true);
        this.sideBarVisible = false;
        break;
      case ProductType.PRODUCT_GROUP:
        this.productService.searchProductGroup(id, true);
        this.sideBarVisible = false;
        break;
    }
  }

  onSearch(event: KeyboardEvent) {
    if(event.key === "Enter" || this.searchtext?.length > 4){
      this.productService.search(this.searchtext || "", true)
    }
  }
}
