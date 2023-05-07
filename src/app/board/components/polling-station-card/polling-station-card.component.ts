import {Component, Input} from '@angular/core';

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


}
