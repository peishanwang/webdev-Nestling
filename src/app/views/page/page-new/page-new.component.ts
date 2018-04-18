import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';
import {WebsiteNewComponent} from "../../website/website-new/website-new.component";

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  websiteId: String;
  pageName: String;
  pageTitle: String;
  errorFlag: boolean;
  errorMsg = 'Please enter valid website name!';

  constructor(
    private pageService: PageService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  createPage() {
    if (WebsiteNewComponent.isEmpty(this.pageName)) {
      this.errorFlag = true;
    } else {
      const newPage = new Page(this.pageName, this.websiteId, this.pageTitle);
      this.pageService.createPage(this.websiteId, newPage).subscribe(
        (data: any) => this.router
          .navigate(['/user', '/website', this.websiteId, 'page'])
      );
    }
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.websiteId = params['wid'];
    });
  }

}
