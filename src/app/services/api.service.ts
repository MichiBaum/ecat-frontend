import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DefaultErrorHandler} from "../errorHandlers/default-error-handler";
import {catchError} from "rxjs/operators";
import {HttpResponseErrorHandler} from "../errorHandlers/http-response-error-handler";
import {T} from "@angular/cdk/keycodes";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private defaultErrorHandler: DefaultErrorHandler) { }

  getAll<T>(path: String, params?: {params: any}, errorHandler: HttpResponseErrorHandler = this.defaultErrorHandler): Observable<T[]>{
    return this.http.get<T[]>(`${environment.api_url}${path}`).pipe(
      catchError(error => {
        errorHandler.handle(error);
        return of<T[]>();
      })
    );
  }

  getSingle<T>(path: String, errorHandler: HttpResponseErrorHandler = this.defaultErrorHandler): Observable<T>{
    return this.http.get<T>(`${environment.api_url}${path}`).pipe(
      catchError(error => {
        errorHandler.handle(error);
        throw error;
      })
    );
  }

  postSingle<T>(path: String, object: any, errorHandler: HttpResponseErrorHandler = this.defaultErrorHandler): Observable<T>{
    return this.http.post<T>(`${environment.api_url}${path}`, object).pipe(
      catchError(error => {
        errorHandler.handle(error);
        throw error;
      })
    );
  }

  deleteSingle(path: String, errorHandler: HttpResponseErrorHandler = this.defaultErrorHandler): Observable<any>{
    return this.http.delete(`${environment.api_url}${path}`).pipe(
      catchError(error => {
        errorHandler.handle(error);
        throw error;
      })
    );
  }
}
