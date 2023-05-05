import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CreateUserRequest} from "../model/CreateUserRequest";
import {Observable} from "rxjs";
import {LoginRequest} from "../model/LoginRequest";

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {

  private URL = environment.URL;

  constructor(private http: HttpClient) { }

  createUser(createUserRequest: CreateUserRequest): Observable<any> {
    const path = "/users/create";
    return this.http.post(this.URL + path, createUserRequest);
  }

  login(request: LoginRequest): Observable<any>  {
    const path = "/login";
    return this.http.post(this.URL + path, request);
  }
}
