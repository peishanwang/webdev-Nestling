import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service.client";
import {Page} from "../../../models/page.model.client";
import {SharedService} from "../../../services/shared.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WebsiteService} from "../../../services/website.service.client";
import {PageService} from "../../../services/page.service.client";

@Component({
  selector: 'app-website-other',
  templateUrl: './website-other.component.html',
  styleUrls: ['./website-other.component.css']
})
export class WebsiteOtherComponent implements OnInit {
  websiteId: String;
  website: any;
  pages: Page[];
  noUser: boolean;

  constructor(
    private pageService: PageService,
    private activateRoute: ActivatedRoute,
    private websiteService: WebsiteService,
    private router: Router,
    private userService: UserService,) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.userService.loggedInStay().subscribe(
        (isLoggedIn) => {
          this.noUser = !isLoggedIn;
        }
      )
      this.websiteId = params['wid'];
      this.websiteService.findWebsiteById(this.websiteId).subscribe(
        (website) => {
          this.website = website;
        }
      )
      this.pageService.findPageByWebsiteId(this.websiteId).subscribe(
        (pages) => {
          this.pages = pages;
        }
      );
    });
  }
  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  deletePage(pageId) {
    //console.log(this.pageId);
    this.pageService.deletePage(pageId).subscribe(
      (data: any) => this.router
        .navigate(['/user', '/website', this.websiteId, 'page'])
    );
  }

}
