import {Component, OnInit} from '@angular/core';
import {UserDetails} from "../../model/User";
import {UsersManagementService} from "../../service/users-management.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  public user!: UserDetails;

  constructor(private userService: UsersManagementService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(data => {
      this.user = data;
    });
  }

  getUserEmail(){
    return this.user.email;
  }

  getUsername(){
    return this.user.username;
  }


}
