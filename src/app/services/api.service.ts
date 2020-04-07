import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DefaultErrorHandler} from "../errorHandlers/default-error-handler";
import {catchError} from "rxjs/operators";
import {HttpResponseErrorHandler} from "../errorHandlers/http-response-error-handler";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private defaultErrorHandler: DefaultErrorHandler) { }

  getAll(path: String): Observable<any>{
    return this.http.get(`${environment.api_url}${path}`).pipe(catchError(error => {
      this.defaultErrorHandler.handle(error);
      return of([]);
    }));
  }

  postSingle(path: String, object: any, errorHandler: HttpResponseErrorHandler = this.defaultErrorHandler): Observable<any>{
    return this.http.post(`${environment.api_url}${path}`, object).pipe(catchError(error => {
      errorHandler.handle(error);
      throw error;
    }));
  }

  deleteSingle(path: String): Observable<any>{
    return this.http.delete(`${environment.api_url}${path}`).pipe(catchError(error => {
      this.defaultErrorHandler.handle(error);
      throw error;
    }));
  }
}
