import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../services/shared.service';
import {UserService} from '../../services/user.service.client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchText: String;
  noUser: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.loggedInStay().subscribe(
      (isLoggedIn) => {
        this.noUser = !isLoggedIn;
      }
    );
  }

}
