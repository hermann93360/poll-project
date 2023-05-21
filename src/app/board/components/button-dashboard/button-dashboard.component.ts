import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-dashboard',
  templateUrl: './button-dashboard.component.html',
  styleUrls: ['./button-dashboard.component.scss']
})
export class ButtonDashboardComponent {

  @Input()
  public label: string = ""

  @Input()
  public icon: string = ""

  @Input()
  public color: string = ""

}
