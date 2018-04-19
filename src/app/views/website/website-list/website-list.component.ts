import { Component, OnInit } from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {
  userId: String;
  websites: Website[];

  constructor(
    private router: Router,
    private websiteService: WebsiteService,
    private activateRoute: ActivatedRoute,
    private sharedService: SharedService) { }

  deleteWebsite(websiteId) {
    this.websiteService.deleteWebsite(websiteId).subscribe(
      (data: any) => this.router.navigate(['/user/website'])
    );
  }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    this.activateRoute.params.subscribe((params: any) => {
      this.websiteService.findWebsitesByUser(this.userId).subscribe(
        (websites) => {
          this.websites = websites;
          console.log(websites);
        }
      );
    });
  }

}
