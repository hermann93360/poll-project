import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../../service/socket/notification.service";
import {UsersManagementService} from "../../../../service/users-management.service";
import {DemandJoinStationNotification} from "../../../../model/notification/DemandJoinStationNotification";
import {PollingStationService} from "../../../../service/polling-station.service";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit{
  displayNotifications = false;

  public demandNotifications: DemandJoinStationNotification[] = [];

  constructor(private notificationService: NotificationService, private userService: UsersManagementService, private pollingStationService: PollingStationService) {
  }

  ngOnInit(): void {
    this.notificationService.init().then(r => {
      this.userService.userDetails.subscribe((value) => {

        this.pollingStationService.getDemandNotifications(value.userId).subscribe((demands) => {
          this.demandNotifications = demands.demands;
        })

        this.notificationService.subscribeNotificationToDemandJoinStation(value.userId, event => {
          console.log("NOTIFICATION !");
          const demand : DemandJoinStationNotification = event.demand;
          this.demandNotifications.push(demand);
          console.log(demand);
        })

      })
    })
  }

  showNotification() {
    this.displayNotifications = !this.displayNotifications;
  }

  removeNotify(demandId: any) {
    this.demandNotifications = this.demandNotifications.filter((el) => el.demandId !== demandId)
  }

}
