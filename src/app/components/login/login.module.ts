import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule, InputTextModule, PasswordModule} from "primeng";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [
  ],
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    CommonModule
  ]
})
export class LoginModule { }
