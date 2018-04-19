import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../../services/shared.service";
import {UserService} from "../../../services/user.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {WebsiteService} from "../../../services/website.service.client";


@Component({
  selector: 'app-profile-other',
  templateUrl: './profile-other.component.html',
  styleUrls: ['./profile-other.component.css']
})
export class ProfileOtherComponent implements OnInit {
  isAdmin: boolean;
  profileUser: any;
  loginUser: any;
  username: String;
  websites: [any];
  followers: [any];
  followings: [any];
  isFollowing: boolean;
  isReviewer: boolean;

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private websiteService: WebsiteService
  ) { }

  follow() {
    this.userService.addFollow(this.loginUser._id, this.profileUser._id).subscribe(
      (any) => {
        this.userService.findFollowersForUser(this.profileUser._id).subscribe(
          (followers) => {
            console.log("add follow success!!")
            this.followers = followers;
            console.log(followers);
            this.isFollowing = true;
            alert("successfully follow " + this.profileUser.username + "!");
          }
        );
      }
    )
    console.log(this.followers);
  }

  unfollow() {
    this.userService.deleteFollow(this.loginUser._id, this.profileUser._id).subscribe(
      (any) => {
        this.userService.findFollowersForUser(this.profileUser._id).subscribe(
          (followers) => {
            console.log("delete follow success!!");
            this.followers = followers;
            console.log(followers);
            this.isFollowing = false;
            //this.router.navigateByUrl(this.router.url);
          }
        );
      }
    )
  }

  ngOnInit() {
    this.loginUser = this.sharedService.user;
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.username = params['username'];
      }
    );
    this.userService.findUserByUsername(this.username).subscribe(
      (user) => {
        this.profileUser = user;
        this.websiteService.findWebsitesByUser(this.profileUser._id).subscribe(
          (websites) => {
            this.websites = websites;
            console.log(websites);
          }
        );
        this.userService.findFollowersForUser(this.profileUser._id).subscribe(
          (followers) => {
            this.followers = followers;
            for (let i = 0; i < followers.length; i++) {
              if (followers[i]._id === this.loginUser._id) {
                this.isFollowing = true;
                return;
              }
            }
          }
        );
        this.userService.findFollowingsForUser(this.profileUser._id).subscribe(
          (followings) => {
            this.followings = followings;
          }
        )
      }
    );
  }

}
