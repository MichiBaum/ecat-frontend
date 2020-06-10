import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";
import {MessageService, SelectItem} from "primeng";
import {AdminEditorService} from "../../services/admin-editor.service";
import {Permission} from "../../models/permission";
import {PermissionService} from "../../services/permission.service";
import {Router} from "@angular/router";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.scss']
})
export class AdminEditorComponent implements OnInit {
  selectedUser: User;
  ownUser: User;
  usersItems: SelectItem[] = [{label: 'Neu', value: {id: null, name: 'Neuer Admin', permissions: [], password: ''}}];
  permissionsItems: SelectItem[] = [];
  showDialog: boolean = false;
  adminForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    permissions: new FormControl(),
    password: new FormControl(''),
  });

  constructor(private userService: UserService,
              public authenticationService: AuthenticationService,
              private adminEditorService: AdminEditorService,
              private permissionService: PermissionService,
              private router: Router,
              private messageService: MessageService)
  {
    adminEditorService.showAdminEditorEmitter.subscribe(showDialog => {
      this.showDialog = showDialog;
    })
  }

  ngOnInit(): void {
    if(this.authenticationService.hasPermission('ADMINISTRATE_ADMINS')){
      forkJoin([
        this.userService.getUsers(),
        this.permissionService.getPermissions()
      ]).subscribe(([users, permissions]) => {
        users.forEach(user => {
          this.usersItems.push(this.convertUserToSelectItem(user));
        })
        permissions.forEach(permission => {
          this.permissionsItems.push(this.convertPermissionToSelectItem(permission));
        })
        this.userService.getUser().subscribe(user => {
          this.selectedUser = user;
          this.ownUser = user;
          this.adminForm.patchValue(this.selectedUser);
        })
      })
    }
    this.userService.getUser().subscribe(user => {
      this.selectedUser = user;
      this.ownUser = user;
      this.adminForm.patchValue(this.selectedUser);
    })
  }

  saveUser() {
    if(!this.passwordsMatch()){
      this.messageService.add({severity:'error', summary:'Fehler', detail:'Die Passwörter stimmen nicht überein'});
    }else{
      this.userService.saveUser(this.adminForm.getRawValue()).subscribe(user => {
          if(this.ownUser.id == user.id){
            this.authenticationService.logout();
            this.router.navigate(['/login']);
          }else if(this.selectedUser.id !== user.id){
            this.usersItems.push(this.convertUserToSelectItem(user));
          }else{
            Object.assign(this.selectedUser, user);
            this.usersItems.find(userItem => userItem.value.id === user.id).label = user.name;
          }
          this.adminForm.patchValue(this.selectedUser);
        },
        (error => {}))
    }
  }
  deleteUser(){
    this.userService.deleteUser(this.selectedUser.id).subscribe(() => {
      this.usersItems.splice(this.usersItems.findIndex(userItem => userItem.value.id == this.selectedUser.id), 1);
      this.selectedUser = this.usersItems[0].value;
      this.adminForm.patchValue(this.selectedUser);
    }, (error =>{}))
  }

  resetFormToLastState(){
    this.adminForm.patchValue(this.selectedUser);
  }

  convertUserToSelectItem(user: User): SelectItem{
    return {
      label: user.name,
      value: user
    }
  }
  convertPermissionToSelectItem(permission: Permission): SelectItem{
    return {
      label: permission.permission,
      value: permission.permission
    }
  }

  passwordsMatch(): boolean{
    return this.adminForm.get('password').value == (<HTMLInputElement>document.getElementById('confirmPasswordField')).value;
  }

}
