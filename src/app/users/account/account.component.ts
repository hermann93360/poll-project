import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CreateUserRequest} from "../../../model/request/CreateUserRequest";
import {UsersManagementService} from "../../../service/users-management.service";
import {Error, UserError} from "../../../model/Error";
import {CreateUserForm} from "../../../model/form/CreateAccountForm";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss', '../users.component.scss']
})
export class AccountComponent implements OnInit {

  public createAccountForm!: FormGroup;

  @ViewChildren(AccountComponent)
  public inputSubmit!: QueryList<AccountComponent>;

  public classNamesEmail!: string;
  public classNamesPassword!: string;
  public classNamesCheckPassword!: string;
  public classNamesSubmit!: string;

  public userError!: UserError;
  public createUserForm!: CreateUserForm;

  constructor(private formBuilder: FormBuilder, public router: Router, private userManagementService: UsersManagementService) {
    this.initCreateAccountForm();
    this.userError = new UserError();
    this.createUserForm = new CreateUserForm();
  }

  ngOnInit(): void {
  }

  initCreateAccountForm(): void {
    this.createAccountForm = this.formBuilder.group({
      username: ['', Validators.required],
      nickname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmation_password: ['', Validators.required],
    })
  }

  checkInputIsNotEmpty(text: string): boolean {
    return text.length == 0;
  }

  createAccount() {
    if (this.createAccountForm.valid) {
      const createAccountFormValue = this.createAccountForm.value;

      if (
        this.checkPassword(createAccountFormValue['password'], createAccountFormValue['confirmation_password']) &&
        this.checkIsStrongPassword(createAccountFormValue['password']) &&
          this.checkEmailAdress(createAccountFormValue['email'])
      ) {

        const request = new CreateUserRequest(
          createAccountFormValue['username'],
          createAccountFormValue['nickname'],
          createAccountFormValue['email'],
          createAccountFormValue['password'],
        )

        this.userManagementService.createUser(request);

        this.userError = this.userManagementService.userError.value;
      }
    }else{
      this.userError.setCurrentError(Error.FORM_ERROR);
    }
  }

  public checkPassword(password: string, passwordToChek: string) {
    return password == passwordToChek;
  }

  public checkPasswordForm(password: string, passwordToChek: string) {
    if(this.checkPassword(password, passwordToChek)){
      this.classNamesCheckPassword = "";
      this.createUserForm.checkPasswordValid();
    }
    else {
      this.classNamesCheckPassword = "input-incorrect";
      this.createUserForm.checkPasswordNotValid();
    }
  }


  public checkEmailAdress(value: string) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(value) || value.length == 0;
  }
  checkEmailAdressForm(value: string) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (this.checkEmailAdress(value)) {
      this.classNamesEmail = ""
      this.createUserForm.emailValid();
    } else {
      this.classNamesEmail = "input-incorrect";
      this.createUserForm.emailNotValid();
    }
  }

  checkIsStrongPassword(value: string) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+-=])[0-9a-zA-Z!@#$%^&*()_+-=]{8,}$/;
    return passwordRegex.test(value) || value.length == 0;
  }

  checkIsStrongPasswordForm(value: string) {
    if (this.checkIsStrongPassword(value)) {
      this.classNamesPassword = ""
      this.createUserForm.passwordValid();
    } else {
      this.classNamesPassword = "input-incorrect";
      this.createUserForm.passwordNotValid();
    }
  }
}
