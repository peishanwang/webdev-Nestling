import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../../services/shared.service";
import {UserService} from "../../../services/user.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {WebsiteService} from "../../../services/website.service.client";

@Component({
  selector: 'app-website-all',
  templateUrl: './website-all.component.html',
  styleUrls: ['./website-all.component.css']
})
export class WebsiteAllComponent implements OnInit {
  noUser: boolean;
  websites: [any];
  searchText: String;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService,
              private userService: UserService,
              private websiteService: WebsiteService) { }

  ngOnInit() {
    this.userService.loggedInStay().subscribe(
      (isLoggedIn) => {
        this.noUser = !isLoggedIn;
      }
    );
    this.websiteService.findAllWebsites().subscribe(
      (websites) => {
        this.websites = websites;
      }
    )
  }

}
