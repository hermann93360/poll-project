import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'button-nav-component',
  templateUrl: './button-nav.component.html',
  styleUrls: ['./button-nav.component.scss'],

})
export class ButtonNavComponent implements OnInit {

  @Input()
  public name: string = "";

  @Input()
  public icon_path: string = "";

  @Input()
  public type: string = "";

  public iconClass: string = "icon";

  @Input()
  public multiple: string = "false";

  public content: string = "padding";

  constructor() {
  }

  ngOnInit() {
    if (this.type == "nav") {
      this.iconClass = "icon-representation"
    }else if(this.type == "below") {
      this.iconClass = "icon"
      this.content = "padding-null";
    } else {
      this.iconClass = "icon"
    }

  }

  isButtonMultiple() {
    return this.multiple == "true";
  }

  isButtonProfil() {
    return this.type == "profil";
  }
}
