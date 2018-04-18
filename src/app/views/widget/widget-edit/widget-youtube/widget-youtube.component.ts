import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteNewComponent} from "../../../website/website-new/website-new.component";

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  pageId: String;
  websiteId: String;
  curWidget: Widget;
  widgetId: String;
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
        const widgetNew = new Widget
        ('YOUTUBE', this.pageId, '', undefined, '', '', '');
        this.widgetService.createWidget(this.pageId, widgetNew).subscribe(
          (widget) => {
            this.widgetId = widget._id;
            //console.log(this.widgetId);
            this.widgetService.findWidgetById(this.widgetId).subscribe(
              (widget: Widget) => {
                this.curWidget = widget;
              }
            );
          }
        );
      } else {
        this.widgetId = params['wgid'];
        this.widgetService.findWidgetById(this.widgetId).subscribe(
          (widget: Widget) => {
            this.curWidget = widget;
          }
        );
      }

    });
  }
}
