import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from "../../../services/shared.service";
import {WebsiteNewComponent} from "../website-new/website-new.component";
import {UserService} from "../../../services/user.service.client";

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  userId: String;
  websiteId: String;
  curWebsite: Website;
  websites: Website[];
  errorFlag: boolean;
  errorMsg = 'Please enter valid website name!';

  constructor(
    private userService: UserService,
    private websiteService: WebsiteService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) {}

  updateWebsite() {
    if (WebsiteNewComponent.isEmpty(this.curWebsite.name)) {
      this.errorFlag = true;
    } else {
      this.websiteService.updateWebsite(this.curWebsite).subscribe(
        (data: any) => this.router.navigate(['/user/website'])
      );
    }
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

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.userId = this.sharedService.user['_id'];
      this.websiteId = params['wid'];
      //console.log(this.websiteId);
      this.websiteService.findWebsiteById(this.websiteId).subscribe(
        (website: Website) => {
          //console.log(website);
          this.curWebsite = website;
        }
      );
      this.websiteService.findWebsitesByUser(this.userId).subscribe(
        (websites) => {
          this.websites = websites;
        }
      );
    });
  }

}
