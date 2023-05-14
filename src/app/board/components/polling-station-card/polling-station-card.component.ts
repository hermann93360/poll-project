import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'polling-station-card-component',
  templateUrl: './polling-station-card.component.html',
  styleUrls: ['./polling-station-card.component.scss']
})
export class PollingStationCardComponent {

  @Input()
  public name: string | undefined = "";
  @Input()
  public creator: string | undefined = "";
  @Input()
  public type: string | undefined = "";
  @Input()
  public category: string | undefined = "";
  @Input()
  public pollingStationId: string | undefined = "";

  constructor(private router: Router) {
  }

  redirectToStation() {
    console.log(this.pollingStationId)
    this.router.navigate(['/station', this.pollingStationId])
  }

  joinRoom() {

  }
}
