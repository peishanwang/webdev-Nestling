///<reference path="../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetText} from "../../../../models/widgetText.model.client";
import {WebsiteNewComponent} from "../../../website/website-new/website-new.component";

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {
  pageId: String;
  websiteId: String;
  widgetId: String;
  curWidget: WidgetText;
  isNew: Boolean;
  errorFlag: boolean;
  errorMsg = 'Please enter valid widget name!';

  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  updateWidget() {
    if (WebsiteNewComponent.isEmpty(this.curWidget.name)) {
      this.errorFlag = true;
    } else {
      this.widgetService.updateWidget(this.widgetId, this.curWidget)
        .subscribe(
          (data: any) => this.router
            .navigate(['/user/website', this.websiteId, 'page', this.pageId, 'widget']),
          (error: any) => console.log(error)
        );
    }
  }

  back() {
    if (this.isNew) {
      this.deleteWidget();
    } else {
      this.router
        .navigate(['/user/website', this.websiteId, 'page', this.pageId, 'widget'])
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId)
      .subscribe(
        (data: any) => {
          if (!this.isNew) {
            this.router
              .navigate(['/user/website', this.websiteId, 'page', this.pageId, 'widget'])
          } else {
            this.router
              .navigate(['/user/website', this.websiteId, 'page', this.pageId, 'widget', 'new'])
          }},
        (error: any) => console.log(error)
      );
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.isNew = false;
      if (params['wgid'] === undefined) {
        this.isNew = true;
        const widgetNew = new WidgetText
        ( 'TEXT', this.pageId, '','', 1,'',false);
        this.widgetService.createWidget(this.pageId, widgetNew).subscribe(
          (widget) => {
            this.widgetId = widget._id;
            this.widgetService.findWidgetById(this.widgetId).subscribe(
              (widget : WidgetText) => {
                this.curWidget = widget;
              }
            );
          }
        );
      } else {
        this.widgetId = params['wgid'];
        this.widgetService.findWidgetById(this.widgetId).subscribe(
          (widget : WidgetText) => {
            this.curWidget = widget;
          }
        );
      }

    });
  }
}
