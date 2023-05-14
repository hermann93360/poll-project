import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PollingStationService} from "../../../../../service/polling-station.service";

@Component({
  selector: 'app-card-notification',
  templateUrl: './card-notification.component.html',
  styleUrls: ['./card-notification.component.scss']
})
export class CardNotificationComponent {
  displayMainContent = true;

  @Input()
  public nameUserRequesting: string = ""

  @Input()
  public namePollingStation: string = ""

  @Input()
  public demandId: string = ""

  @Input()
  public profilePath: string = ""

  @Output() removeNotify = new EventEmitter<string>();

  constructor(private pollingStationService: PollingStationService) {
  }
  show() {
    this.displayMainContent = !this.displayMainContent
  }

  accept() {
    this.pollingStationService.acceptDemand(this.demandId).subscribe((value) => {
      console.log("accepted")
      this.removeNotify.emit(this.demandId);
    })
  }

  reject() {
    this.pollingStationService.rejectDemand(this.demandId).subscribe((value) => {
      console.log("rejected")
      this.removeNotify.emit(this.demandId);
    })
  }
}
