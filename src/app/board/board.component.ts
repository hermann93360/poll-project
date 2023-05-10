import {Component, HostListener, OnInit} from '@angular/core';
import {PollingStation} from "../../model/PollingStation";
import {PollingStationService} from "../../service/polling-station.service";
import {navBoardAnimation} from "../../animations/animations";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    navBoardAnimation
  ]
})
export class BoardComponent implements OnInit {

  public isMobile: boolean = false;
  public displayNav: any | boolean;
  public pollingStationToUserLogged: PollingStation[] = []
  public colorCard: string[] = ['blue-header', 'purple-header', 'black-header'];

  constructor(private pollingStationService: PollingStationService) {
    this.setIsMobile(window.innerWidth);
  }

  showNav(data: boolean) {
    this.displayNav = data;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setIsMobile(event.target.innerWidth);
  }

  setIsMobile(width: number) {
    this.isMobile = width < 1024;
  }

  ngOnInit(): void {
    this.pollingStationService.pollingStationToUser.subscribe(
      (value) => {
        this.pollingStationToUserLogged = value.slice(0, 3);
      }
    )
  }

}
