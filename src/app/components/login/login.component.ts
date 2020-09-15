import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {User} from "../../models/user";
import {MessageService} from "primeng";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class:'p-col'
  }
})
export class LoginComponent {

  constructor(private loginService: LoginService, private messageService: MessageService, private authenticationService: AuthenticationService, private router: Router) { }

  loginFormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    }
  );

  login(){
    const user: User = this.loginFormGroup.getRawValue();
    this.loginService.login(user).subscribe(data => {
      this.authenticationService.setToken(data);
      this.router.navigate(['/homepage']);
    },
      (() => {}));
  }
  loginOnEnter(event: KeyboardEvent){
    if(event.key === "Enter"){
      this.login();
    }
  }

}
