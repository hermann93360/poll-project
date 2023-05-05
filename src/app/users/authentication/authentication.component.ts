import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsersManagementService} from "../../../service/users-management.service";
import {CreateUserRequest} from "../../../model/CreateUserRequest";
import {LoginRequest} from "../../../model/LoginRequest";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss', '../users.component.scss']
})
export class AuthenticationComponent {
  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public router: Router, private userManagementService: UsersManagementService) {
    this.initloginForm();
  }

  private initloginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      const loginFormValue = this.loginForm.value;

      const request = new LoginRequest(
        loginFormValue['email'],
        loginFormValue['password']
      )

      this.userManagementService.login(request).subscribe(
        (value) => {
          console.log(value);
        },
        (error) => {
          console.log("error " + error)
        },
        () => {
          console.log("completed!")
        }
      )
    }
  }
}
