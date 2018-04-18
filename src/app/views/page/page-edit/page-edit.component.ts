import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteNewComponent} from "../../website/website-new/website-new.component";

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  pageId: String;
  websiteId: String;
  curPage: Page;
  errorFlag: boolean;
  errorMsg = 'Please enter valid page name!';

  constructor(
    private pageService: PageService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  updatePage() {
    if (WebsiteNewComponent.isEmpty(this.curPage.name)) {
      this.errorFlag = true;
    } else {
      this.pageService.updatePage(this.pageId, this.curPage).subscribe(
        (data: any) => this.router
          .navigate(['/user', '/website', this.websiteId, 'page'])
      );
    }
  }

  deletePage() {
    //console.log(this.pageId);
    this.pageService.deletePage(this.pageId).subscribe(
      (data: any) => this.router
        .navigate(['/user', '/website', this.websiteId, 'page'])
    );
  }


  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.pageService.findPageById(this.pageId).subscribe(
        (page: Page) => {
          this.curPage = page;
        }
      );
    });
  }

}
