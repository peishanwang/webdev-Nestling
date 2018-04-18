import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: {};
  userId: String;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
    ) {
  }

  updateUser() {
    //console.log(user);
    this.route.params.subscribe(params => {
      this.userService.updateUser(this.user).subscribe();
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.userId).subscribe((status) => {
      this.router.navigate(['/login']);
    });
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  ngOnInit() {
    //console.log(this.sharedService.user);
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];
    //console.log(this.userId);
  }

}
