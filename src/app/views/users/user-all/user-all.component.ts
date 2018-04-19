import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../../services/shared.service";
import {UserService} from "../../../services/user.service.client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css']
})
export class UserAllComponent implements OnInit {
  noUser: boolean;
  users: [any];
  searchText: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) { }

  searchUsers() {
      this.userService.findUsersByUsernameLike(this.searchText).subscribe(
        (users) => {
          this.users = users;
        }
      );
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => {
          this.sharedService.user = '';
          (data: any) => this.router.navigate(['/'])
        }
      );
  }

  ngOnInit() {
    this.userService.loggedInStay().subscribe(
      (isLoggedIn) => {
        this.noUser = !isLoggedIn;
      }
    );
    this.userService.findAllUsers().subscribe(
      (users) => {
        this.users = users;
      }
    );


  }

}
