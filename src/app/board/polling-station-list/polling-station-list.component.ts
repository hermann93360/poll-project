import {Component, OnInit} from '@angular/core';
import {PollingStationService} from "../../../service/polling-station.service";
import {PollingStation} from "../../../model/PollingStation";
import {advancedFadeAnimation, fadeAnimation, navAnimation, popAnimation} from "../../../animations/animations";


@Component({
  selector: 'app-polling-station-list',
  templateUrl: './polling-station-list.component.html',
  styleUrls: ['./polling-station-list.component.scss'],
  animations: [
    navAnimation,
    popAnimation,
    advancedFadeAnimation
  ]
})
export class PollingStationListComponent implements OnInit{

  public pollingStationList: PollingStation[] = []
  public displayPollingStationForm: boolean = false;
  public displayNotificationPollingStationCreated: boolean = false

  constructor(private pollingStationService: PollingStationService) {
  }

  ngOnInit(): void {
    this.pollingStationService.pollingStation.subscribe(
      (value) => {
        this.pollingStationList = value.slice(value.length - 3, value.length);
        console.log(this.pollingStationList)
      }
    )
  }

  pollingStationDisplaying(): PollingStation[] {
    return this.pollingStationList.slice(1);
  }


  showPollingStationForm() {
    this.displayPollingStationForm = !this.displayPollingStationForm;
  }

  hideNotification() {
    this.displayNotificationPollingStationCreated = false;
  }

  newPollingStationCreated($event: boolean) {
    this.displayNotificationPollingStationCreated = true;
    setTimeout(() => {
      this.displayNotificationPollingStationCreated = false
      this.displayPollingStationForm = !this.displayPollingStationForm;
    }, 1500)
  }
}
