import {Component, OnInit} from '@angular/core';
import {PollingStationService} from "../../../service/polling-station.service";
import {PollingStation} from "../../../model/PollingStation";

@Component({
  selector: 'app-polling-station-list',
  templateUrl: './polling-station-list.component.html',
  styleUrls: ['./polling-station-list.component.scss']
})
export class PollingStationListComponent implements OnInit{

  public pollingStationList: PollingStation[] = []
  public displayPollingStationForm: boolean = true;

  constructor(private pollingStationService: PollingStationService) {
  }

  ngOnInit(): void {
    this.pollingStationService.getAllPollingStation();
    this.pollingStationService.pollingStation.subscribe(
      (value) => {
        this.pollingStationList = value;
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
}
