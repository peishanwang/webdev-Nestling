import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service.client";
import {SharedService} from "../../../services/shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-followings',
  templateUrl: './user-followings.component.html',
  styleUrls: ['./user-followings.component.css']
})
export class UserFollowingsComponent implements OnInit {

  followings: any;
  user: any;
  constructor(private userService: UserService,
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userService.findFollowingsForUser(this.user._id)
      .subscribe(
        (followings: any) => {
          this.followings = followings;
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
