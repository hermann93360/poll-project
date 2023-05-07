import {Component, Input} from '@angular/core';

@Component({
  selector: 'line-component',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent {

  @Input()
  public color: string = "black";
}
