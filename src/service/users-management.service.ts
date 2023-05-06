import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreateUserRequest} from "../model/request/CreateUserRequest";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginRequest} from "../model/request/LoginRequest";
import {UserDetails} from "../model/User";
import {Router} from "@angular/router";
import {Error, UserError} from "../model/Error";

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {

  private URL = environment.URL;
  public userDetails: BehaviorSubject<UserDetails> = new BehaviorSubject<UserDetails>(UserDetails.UNKNOW);
  public userError: BehaviorSubject<UserError> = new BehaviorSubject(new UserError());


  constructor(private http: HttpClient, private router: Router) {
    this.setUserDetails();

  }

  getHeader() {
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      .set('Content-Type', 'application/json');
  }

  createUser(createUserRequest: CreateUserRequest) {
    const path = "/users/create";
    this.http.post(this.URL + path, createUserRequest).subscribe(
      () => {

        const request = new LoginRequest(
          createUserRequest.email,
         createUserRequest.password
        )

        console.log("created!");
        this.login(request);
      },
      (error) => {

        if(error.error.message == "This mail is already used") {
          this.userError.value.setCurrentError(Error.EMAIL_ERROR);
          this.userError.next(this.userError.value);
        }else{
          this.userError.value.setCurrentError(Error.UNKNOW_ERROR);
          this.userError.next(this.userError.value);
        }
      },
      () => {
        console.log("completed!")
      }
    );
  }

  login(request: LoginRequest) {
    const path = "/login";
    this.http.post<any>(this.URL + path, request).subscribe(
      (value) => {
        console.log(value.access_token);
        const token = value.access_token;
        this.connect(token);
        this.setUserDetails();
        this.router.navigate(['/dashboard'])
      },
      (error) => {
        console.log(error)
        this.userError.value.setCurrentError(Error.AUTHENTICATION_ERROR);
        this.userError.next(this.userError.value);
      },
      () => {
        console.log("completed!")
      }
    );
  }
  setUserDetails() {
    const path = "/user/details";

    this.http.get<UserDetails>(this.URL + path, { headers: this.getHeader() } ).subscribe(
      (value) => {
        const userDetail : UserDetails = {...value};
        this.userDetails.next(userDetail);
        console.log(this.userDetails)
      }
    )
  }
  connect(token: string) {
    localStorage.setItem('access_token', token);
  }
  disconnect() {
    localStorage.removeItem('access_token');
    this.userDetails.next(UserDetails.UNKNOW);
    //TODO don't forgot to deactivate token validation
  }

  getUser(){
    return this.userDetails.asObservable();
  }

  isConnect() {
    return localStorage.getItem('access_token') != null && localStorage.getItem('access_token')?.length != 0;
    //TODO verify token validation

  }
}
