import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {ValidationErrorHandler} from "../errorHandlers/validation-error-handler";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersPath: string = '/users';
  private userPath: string = '/user';
  private saveUserPath: string = '/users/save';

  constructor(private apiService: ApiService, private validationErrorHandler: ValidationErrorHandler) { }

  getUsers(): Observable<User[]>{
    return this.apiService.getAll<User>(this.usersPath);
  }
  getUser(): Observable<User> {
    return this.apiService.getSingle(this.userPath);
  }
  saveUser(user: User): Observable<User>{
    return this.apiService.postSingle(this.saveUserPath, user, this.validationErrorHandler);
  }
  deleteUser(userId: number){
    return this.apiService.deleteSingle(this.usersPath + '/' + userId);
  }
}
