import { Injectable } from '@angular/core';
import {Token} from "../models/token";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginPath: string = '/login';

  constructor(private apiService: ApiService) {
  }

  login(user: User): Observable<Token> {
    return this.apiService.postSingle<Token>(this.loginPath, user);
  }

}
