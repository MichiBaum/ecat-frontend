import { Injectable } from '@angular/core';
import {Token} from "../models/token";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getPermissions(): string[]{
    if(sessionStorage.getItem('token')){
      return JSON.parse(sessionStorage.getItem('token')).permissions;
    }else {
      return [];
    }
  }

  isLoggedIn(): boolean{
    return !!sessionStorage.getItem('token');

  }

  setToken(token: Token){
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): Token{
    return JSON.parse(sessionStorage.getItem('token'));
  }

  hasPermission(permission: string): boolean{
    return this.getPermissions().indexOf(permission) != -1;
  }

  hasAnyPermission(...permissions: string[]){
    return this.getPermissions().some(permission => permissions.indexOf(permission) >= 0);
  }

  logout() {
    sessionStorage.removeItem('token');
  }
  getUsername(){
    return JSON.parse(sessionStorage.getItem('token')).username;
  }
}
