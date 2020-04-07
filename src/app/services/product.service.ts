import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  @Output() products: EventEmitter<Product[]> = new EventEmitter<Product[]>();

  constructor(private http: HttpClient, private router: Router) { }

  search(searchtext?: string, withredirect?: boolean) {
    const path = "/products/search";
    this.http.get<Product[]>(`${environment.api_url}${path}`, {params: {"searchtext": searchtext}}).pipe(
      catchError(() => {
        return of([])
      })
    ).subscribe(
      (products) => {
        if (withredirect) {
          this.router.navigate(['/products']).then(() => {
            this.products.emit(products as Product[])
          });
        } else {
          this.products.emit(products as Product[])
        }
      }
    )
  }

  searchProductGroup(id: any, withredirect: boolean) {
    const path = "/productgroups/";
    this.findProductByProductType(path, id, withredirect);
  }

  searchProductFamily(id: any, withredirect: boolean) {
    const path = "/productfamilies/";
    this.findProductByProductType(path, id, withredirect);
  }

  searchProductClass(id: any, withredirect: boolean) {
    const path = "/productclasses/";
    this.findProductByProductType(path, id, withredirect);
  }

  private findProductByProductType(path: string, id: any, withredirect: boolean) {
    this.http.get<Product[]>(`${environment.api_url}${path}${id}`).pipe(
      catchError(() => {
        return of([])
      })
    ).subscribe(
      (products) => {
        if (withredirect) {
          this.router.navigate(['/products']).then(() => {
            this.products.emit(products as Product[])
          });
        } else {
          this.products.emit(products as Product[])
        }
      }
    )
  }
}
