import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";
import {ConfirmationService, Dropdown, MessageService, MultiSelect, SelectItem} from "primeng";
import {AdminEditorService} from "../../services/admin-editor.service";
import {Permission} from "../../models/permission";
import {PermissionService} from "../../services/permission.service";
import {Router} from "@angular/router";
import {forkJoin} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.scss']
})
export class AdminEditorComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect: MultiSelect;
  @ViewChild('dropdown') dropdown: Dropdown;
  confirmPassword: string = '';
  selectedUser: User;
  ownUser: User;
  usersItems: SelectItem[] = [{label: 'Neu', value: new User()}];
  permissionsItems: SelectItem[] = [];
  showDialog: boolean = false;
  adminForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    permissions: new FormControl(),
    password: new FormControl(),
  });

  constructor(private userService: UserService,
              public authenticationService: AuthenticationService,
              private adminEditorService: AdminEditorService,
              private permissionService: PermissionService,
              private router: Router,
              private messageService: MessageService,
              private translateService: TranslateService,
              private confirmationService: ConfirmationService)
  {
    adminEditorService.showAdminEditorEmitter.subscribe(showDialog => {
      this.showDialog = showDialog;
    })
  }

  ngOnInit(): void {
    if(this.authenticationService.hasPermission('ADMINISTRATE_USERS')){
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
          //set blank password for password reset
          user.password = '';
          this.selectedUser = user;
          this.ownUser = user;
          this.adminForm.patchValue(this.selectedUser);
        })
      })
    }
    this.userService.getUser().subscribe(user => {
      //set because User class requires password
      user.password = '';
      this.selectedUser = user;
      this.ownUser = user;
      this.adminForm.patchValue(this.selectedUser);
    });
  }

  saveUser() {
    if(!this.passwordsMatch()){
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant('toastMessages.error'),
        detail: this.translateService.instant('adminEditor.passwordMismatch')
      });
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
          this.messageService.add({
            severity:'success',
            summary: this.translateService.instant('toastMessages.success'),
            detail: this.translateService.instant('adminEditor.successfulSave')
          });
          this.confirmPassword = '';
        },
        () => {})
    }
  }
  deleteUser(){
    this.confirmationService.confirm({
      message: this.translateService.instant('confirmation.delete.user'),
      accept: () => {
        this.userService.deleteUser(this.selectedUser.id).subscribe(() => {
          this.usersItems.splice(this.usersItems.findIndex(userItem => userItem.value.id == this.selectedUser.id), 1);
          this.selectedUser = this.usersItems[0].value;
          this.adminForm.patchValue(this.selectedUser);
        }, () =>{})
      }
    });
  }

  resetFormToLastState(){
    this.adminForm.patchValue(this.selectedUser);
    this.confirmPassword = '';
  }

  convertUserToSelectItem(user: User): SelectItem{
    //set blank password for password reset
    user.password = '';
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
    return this.adminForm.get('password').value == this.confirmPassword;
  }
  closeDropdowns(event){
    if(this.multiSelect){
      this.multiSelect.hide();
    }
    this.dropdown.hide(event);
  }

}
