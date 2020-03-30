import { Injectable } from '@angular/core';
import {Token} from "../classes/token";
import {HttpClient} from "@angular/common/http";
import {User} from "../classes/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginPath: string = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<Token> {
    return this.http.post<Token>(this.loginPath, user);
  }
}
