import {Component, Input} from '@angular/core';
import {tick} from "@angular/core/testing";

@Component({
  selector: 'title-component',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {

  @Input()
  public label: string = ""

  @Input()
  public size: string = ""


}
