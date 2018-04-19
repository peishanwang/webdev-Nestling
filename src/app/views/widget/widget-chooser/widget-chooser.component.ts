import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from "../../../models/page.model.client";
import {PageService} from "../../../services/page.service.client";

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {
  pageId: String;
  page: Page;
  constructor(
    private activateRoute: ActivatedRoute,
    private pageService: PageService) {}

  ngOnInit() {

    this.activateRoute.params.subscribe((params: any) => {
      this.pageId = params['pid'];
      this.pageService.findPageById(this.pageId).subscribe((page) => {
        this.page = page;
      })
    });
  }


}
