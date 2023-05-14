import {Component, Input} from '@angular/core';
import _default from "chart.js/dist/plugins/plugin.legend";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-polling-station-user-list',
  templateUrl: './polling-station-user-list.component.html',
  styleUrls: ['./polling-station-user-list.component.scss']
})
export class PollingStationUserListComponent {

  @Input()
  public colorHeader: string = ""

  @Input()
  public title: string = ""

  @Input()
  public description: string = ""

  @Input()
  public pollingStationId: string = ""


  constructor(private router: Router) {
  }

  redirectToStation(pollingStationId: string) {
    console.log(pollingStationId)
    this.router.navigate(['/station', pollingStationId])
  }
}
