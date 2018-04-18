import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './views/users/login/login.component';
import { ProfileComponent } from './views/users/profile/profile.component';
import { RegisterComponent } from './views/users/register/register.component';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { WebsiteListComponent } from './views/website/website-list/website-list.component';
import { WebsiteNewComponent } from './views/website/website-new/website-new.component';
import { WebsiteEditComponent } from './views/website/website-edit/website-edit.component';
import { PageListComponent } from './views/page/page-list/page-list.component';
import { PageNewComponent } from './views/page/page-new/page-new.component';
import { PageEditComponent } from './views/page/page-edit/page-edit.component';
import { WidgetChooserComponent } from './views/widget/widget-chooser/widget-chooser.component';
import { WidgetListComponent } from './views/widget/widget-list/widget-list.component';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { QuillEditorModule } from 'ngx-quill-editor';
import { WidgetEditComponent } from './views/widget/widget-edit/widget-edit.component';
import { WidgetHeaderComponent } from './views/widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './views/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import { GifService } from "./services/gif.service.client";
import { UserService } from './services/user.service.client';
import { WebsiteService } from './services/website.service.client';
import { PageService } from './services/page.service.client';
import { WidgetService } from './services/widget.service.client';
import { WbdvSortableDirective } from './wbdv-sortable.directive';
import { WidgetHtmlComponent } from './views/widget/widget-edit/widget-html/widget-html.component';
import { WidgetTextComponent } from './views/widget/widget-edit/widget-text/widget-text.component';
import {FlickrImageSearchComponent} from "./views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component";
import {SharedService} from "./services/shared.service";
import {FlickrService} from "./services/flickr.service.client";
import {OrderByPipe} from "./views/widget/widget-list/order-by-pipe.pipe";
import {AuthGuard} from "./services/auth-guard.service";





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteListComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    PageListComponent,
    PageNewComponent,
    PageEditComponent,
    WidgetChooserComponent,
    WidgetListComponent,
    WidgetEditComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    WbdvSortableDirective,
    WidgetHtmlComponent,
    WidgetTextComponent,
    FlickrImageSearchComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    HttpClientModule,
    QuillEditorModule
  ],
  providers: [GifService, UserService, WebsiteService, PageService, WidgetService, AuthGuard, SharedService, FlickrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
