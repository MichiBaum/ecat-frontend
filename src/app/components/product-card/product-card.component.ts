import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../classes/product";
import {ProductService} from "../../services/product.service";
import {ConfirmationService} from "primeng";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Output() deletedProduct = new EventEmitter();

  constructor(private productService: ProductService, private confirmService: ConfirmationService) { }

  ngOnInit(): void {
  }

  deleteProduct(productId: number){
    this.confirmService.confirm({
      message: 'Are you sure you want to delete this product',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe(data => {
            this.deletedProduct.emit(productId);
          },
          (error => {}));
      }
    })
  }

}
