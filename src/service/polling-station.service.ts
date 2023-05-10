import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UsersManagementService} from "./users-management.service";
import {PollingStation} from "../model/PollingStation";
import {BehaviorSubject} from "rxjs";
import {CreateUserRequest} from "../model/request/CreateUserRequest";
import {LoginRequest} from "../model/request/LoginRequest";
import {Error} from "../model/Error";
import {CreatePollingStationRequest} from "../model/request/CreatePollingStationRequest";

@Injectable({
  providedIn: 'root'
})
export class PollingStationService {

  private URL = environment.URL;
  public pollingStation: BehaviorSubject<PollingStation[]> = new BehaviorSubject<PollingStation[]>(PollingStation.EMPTY_LIST);
  public pollingStationToUser: BehaviorSubject<PollingStation[]> = new BehaviorSubject<PollingStation[]>(PollingStation.EMPTY_LIST);

  constructor(private http: HttpClient, private router: Router, private userService: UsersManagementService) {
    this.getAllPollingStation();
    this.getAllPollingStationToUser();
  }

  getAllPollingStationToUser() {
    const path = "/polling-station/";
    this.http.get<any>(this.URL + path, {headers: this.userService.getHeader()}).subscribe(
      (value) => {
        this.pollingStationToUser.next(value.pollingStationDtoList);
        console.log("taked!");
      },
      (error) => {
      },
      () => {
        console.log("completed!")
      }
    );
  }
  getAllPollingStation() {
    const path = "/polling-station/all";
    this.http.get<any>(this.URL + path, {headers: this.userService.getHeader()}).subscribe(
      (value) => {

        console.log(value.pollingStationDtoList)
        this.pollingStation.next(value.pollingStationDtoList);


        console.log("created!");
      },
      (error) => {
      },
      () => {
        console.log("completed!")
      }
    );
  }

  createPollingStation(createPollingStationRequest: CreatePollingStationRequest) {
    const path = "/polling-station/create";
    this.http.post(this.URL + path, createPollingStationRequest,{headers: this.userService.getHeader()}).subscribe(
      () => {
        console.log("created!")
      },
      (error) => {
        console.log("error!")
      },
      () => {
        console.log("completed!")
      }
    );
  }
}
