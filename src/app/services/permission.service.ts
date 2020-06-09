import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Permission} from "../models/permission";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissionPath: string = '/permissions'

  constructor(private apiService: ApiService) { }

  getPermissions(): Observable<Permission[]> {
    return this.apiService.getAll(this.permissionPath);
  }
}
