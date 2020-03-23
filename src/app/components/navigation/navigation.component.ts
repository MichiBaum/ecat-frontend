import {Component, HostListener, OnInit} from '@angular/core';
import {TreeNode} from "primeng/api/treenode";
import {ProductTypesService} from "../../services/product-types.service";
import {ProductGroup} from "../../classes/product-group";
import {ProductClass} from "../../classes/product-class";
import {ProductFamily} from "../../classes/product-family";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  displaySideBar = false;
  data: TreeNode[] = [];
  productGroups: ProductGroup[] = [];
  screenSize: number;

  constructor(private productTypesService: ProductTypesService) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenSize = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.screenSize = window.innerWidth;
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
      children: children
    }
  }

  private convertProductFamilyToTreenode(productFamily: ProductFamily): TreeNode{
    return{
      label: productFamily.name
    }
  }

}
