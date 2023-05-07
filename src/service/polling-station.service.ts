import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UsersManagementService} from "./users-management.service";
import {PollingStation} from "../model/PollingStation";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PollingStationService {

  private URL = environment.URL;
  public pollingStation: BehaviorSubject<PollingStation[]> = new BehaviorSubject<PollingStation[]>(PollingStation.EMPTY_LIST);

  constructor(private http: HttpClient, private router: Router, private userService: UsersManagementService) {
  }
  getAllPollingStation() {
    const path = "/pollingStation";
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
}
