import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service.client";
import {SharedService} from "../../../services/shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.css']
})
export class UserFollowersComponent implements OnInit {

  followers: any;
  user: any;
  constructor(private userService: UserService,
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userService.findFollowersForUser(this.user._id)
      .subscribe(
        (followers: any) => {
          this.followers = followers;
        }
      )
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => {
          this.sharedService.user = '';
          this.router.navigate(['/']);
        }
      );
  }

}
