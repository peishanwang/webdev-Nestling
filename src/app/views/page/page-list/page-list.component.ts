import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {WebsiteService} from "../../../services/website.service.client";
import {UserService} from "../../../services/user.service.client";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  websiteId: String;
  website: any;
  pages: Page[];
  noUser: boolean;
  isOwner: boolean;

  constructor(
    private pageService: PageService,
    private activateRoute: ActivatedRoute,
    private websiteService: WebsiteService,
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.websiteId = params['wid'];
      this.websiteService.findWebsiteById(this.websiteId).subscribe(
        (website) => {
          this.website = website;
          this.userService.loggedInStay().subscribe(
            (isLoggedIn) => {
              this.noUser = !isLoggedIn;
              this.isOwner = isLoggedIn && this.sharedService.user['username'] === this.website.username;
            }
          )
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
