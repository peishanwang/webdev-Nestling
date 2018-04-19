import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Page} from "../../../models/page.model.client";
import {PageService} from "../../../services/page.service.client";
import {WebsiteService} from "../../../services/website.service.client";
import {UserService} from "../../../services/user.service.client";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  pageId: String;
  website: any;
  page: Page;
  webId: String;
  widgets: Widget[];
  noUser: boolean;
  isOwner: boolean;

  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private pageService: PageService,
    private router: Router,
    private websiteService: WebsiteService,
    private userService: UserService,
    private sharedService: SharedService) { }

  getUrl(url: String) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.toString().replace('watch?v=', 'embed/'));
  }

  deleteWidget(widgetId) {
    this.widgetService.deleteWidget(widgetId)
      .subscribe(
        (data: any) => {
            this.router
              .navigate(['/user/website', this.webId, 'page', this.pageId, 'widget'])
          },
        (error: any) => console.log(error)
      );
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.webId = params['wid'];
      this.pageId = params['pid'];
      this.websiteService.findWebsiteById(this.webId).subscribe(
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
      this.widgetService.findWidgetsByPageId(this.pageId).subscribe(
        (widgets) => {
          this.widgets = widgets;
          //console.log(this.widgets);
        }
      );
      this.pageService.findPageById(this.pageId).subscribe((page) => {
        this.page = page;
      })
    });
  }

  reorderWidgets(indexes) {
    // call widget service function to update widget as per index
    //console.log(indexes);
    this.widgetService.reorderWidgets(indexes.startIndex, indexes.endIndex, this.pageId)
      .subscribe(
        //(data) => console.log(data)
      );
  }

}
