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

  getAll<T>(path: String): Observable<T[]>{
    return this.http.get<T[]>(`${environment.api_url}${path}`).pipe(catchError(error => {
      this.defaultErrorHandler.handle(error);
      return of<T[]>();
    }));
  }

  getSingle<T>(path: String): Observable<T>{
    return this.http.get<T>(`${environment.api_url}${path}`).pipe(catchError(error => {
      this.defaultErrorHandler.handle(error);
      throw error;
    }));
  }

  postSingle<T>(path: String, object: any): Observable<T>{
    return this.http.post<T>(`${environment.api_url}${path}`, object).pipe(catchError(error => {
      console.log(error.message);
      this.defaultErrorHandler.handle(error);
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
