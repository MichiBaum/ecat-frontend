import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {User} from "../../models/user";
import {MessageService} from "primeng";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private messageService: MessageService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  loginFormGroup = new FormGroup(
    {
      username: new FormControl('', [
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
      (error => {
      })
    )
  }

}
