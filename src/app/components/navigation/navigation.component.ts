import {Component, OnInit} from '@angular/core';
import {TreeNode} from "primeng/api/treenode";
import {ProductTypesService} from "../../services/product-types.service";
import {ProductGroup} from "../../models/product-group";
import {ProductClass} from "../../models/product-class";
import {ProductFamily} from "../../models/product-family";
import {Router} from "@angular/router";
import {WindowResizeListenerService} from "../../services/window-resize-listener.service";
import {ProductService} from "../../services/product.service";
import {ProductType} from "../../models/product-type.enum";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  sideBarVisible = false;
  data: TreeNode[] = [];
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
          this.data.push(this.convertProductGroupToTreenode(productGroup));
        });
    },
      (error => {
        console.log(error.status);
      })
    );
  }

  private convertProductGroupToTreenode(productGroup: ProductGroup): TreeNode{
    let children: TreeNode[] = [];
    productGroup.productClasses.forEach(productClass => {
        children.push(this.convertProductClassToTreenode(productClass));
      }
    );
    return {
      label: productGroup.name,
      data: {type: ProductType.PRODUCT_GROUP, id: productGroup.id},
      children: children
    }
  }

  private convertProductClassToTreenode(productClass: ProductClass): TreeNode{
    let children: TreeNode[] = [];
    productClass.productFamilies.forEach(productFamily => {
        children.push(this.convertProductFamilyToTreenode(productFamily));
      }
    );
    return {
      label: productClass.name,
      data: {type: ProductType.PRODUCT_CLASS, id: productClass.id},
      children: children
    }
  }

  private convertProductFamilyToTreenode(productFamily: ProductFamily): TreeNode{
    return{
      label: productFamily.name,
      data: {type: ProductType.PRODUCT_FAMILY, id: productFamily.id},
    }
  }

  searchProducts(event: any) {
    switch (event.node.data.type as ProductType) {
      case ProductType.PRODUCT_CLASS:
        this.productService.searchProductClass(event.node.data.id, true);
        this.sideBarVisible = false;
        break;
      case ProductType.PRODUCT_FAMILY:
        this.productService.searchProductFamily(event.node.data.id, true);
        this.sideBarVisible = false;
        break;
      case ProductType.PRODUCT_GROUP:
        this.productService.searchProductGroup(event.node.data.id, true);
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
