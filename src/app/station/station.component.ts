import {Component, OnDestroy, OnInit} from '@angular/core';
import {color} from "chart.js/helpers";
import {PollingStationFull} from "../../model/PollingStationFull";
import {ActivatedRoute} from "@angular/router";
import {PollingStationService} from "../../service/polling-station.service";
import {WebsocketService} from "../../service/socket/websocket.service";
import {NotificationService} from "../../service/socket/notification.service";
import {Subject} from "../../model/Subject";
import {UsersManagementService} from "../../service/users-management.service";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit, OnDestroy{

  public pollingStation: PollingStationFull = PollingStationFull.EMPTY;
  public pollingStationId!: string;
  public isAdministrator = false;

  public subjectsToDisplay: Subject[]  = [];
  public indiceDisplaying = 0;

  constructor(private route: ActivatedRoute,
              private pollingStationService: PollingStationService,
              private notificationService: NotificationService,
              private userService: UsersManagementService) {
    userService.setUserDetails();
    userService.setUsers();
  }


  ngOnDestroy(): void {
    this.notificationService.unsubscripeNotificationToStationSubjects(this.pollingStationId);
  }

  protected readonly color = color;

  ngOnInit(): void {




    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.pollingStationId = params['id'];

      this.notificationService.init().then(r => {
        this.notificationService.subscribeNotificationToStationSubjects(this.pollingStationId, (event) => {
          console.log(event.subject)
          this.addSubjectsToCurrentStation(event);
        });

        this.notificationService.subscribeNotificationToStationUsers(this.pollingStationId, (event) => {
          console.log("NEW USER")
          console.log(event.user)
          this.pollingStation.users.push(event.user);
        });
      })

      this.getPollingStationById();
    });

  }

  private addSubjectsToCurrentStation(event: any) {
    this.pollingStation?.subjects.push(event.body);
    if (this.subjectsToDisplay.length < 3) {
      this.subjectsToDisplay.push(event.body)
    }
    if(this.subjectsToDisplay.length == 3) {
      this.nextSubjects();
    }
  }

  private getPollingStationById() {
    this.pollingStationService.getAllPollingStationById(this.pollingStationId).subscribe(
      (value) => {
        this.pollingStation = value.pollingStation;
        this.subjectsToDisplay = value.pollingStation.subjects.slice(this.indiceDisplaying, 3);
        this.userIdAdministrator()
      }
    )


  }

  userIdAdministrator() {
    this.isAdministrator = this.pollingStation.administratorId === this.userService.userDetailsVar.userId;
  }

  nextSubjects() {
    if(this.indiceDisplaying + 3 > this.pollingStation.subjects.length-1) {
      throw new Error("NOT POSSIBLE")
    }
    this.indiceDisplaying += 3;
    this.subjectsToDisplay = this.pollingStation?.subjects.slice(this.indiceDisplaying, this.indiceDisplaying + 3);
    console.log(this.subjectsToDisplay)
  }

  previousSubject() {
    if(this.indiceDisplaying - 3 < 0) {
      throw new Error("NOT POSSIBLE")
    }

    this.indiceDisplaying -= 3
    this.subjectsToDisplay = this.pollingStation?.subjects.slice(this.indiceDisplaying, this.indiceDisplaying + 3);
    console.log(this.subjectsToDisplay)

  }
}
