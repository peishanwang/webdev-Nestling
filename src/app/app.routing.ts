import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './services/auth-guard.service';
import {LoginComponent} from './views/users/login/login.component';
import {ProfileComponent} from './views/users/profile/profile.component';
import {RegisterComponent} from './views/users/register/register.component';
import {WebsiteListComponent} from "./views/website/website-list/website-list.component";
import {WebsiteEditComponent} from "./views/website/website-edit/website-edit.component";
import {WebsiteNewComponent} from "./views/website/website-new/website-new.component";
import {WidgetChooserComponent} from "./views/widget/widget-chooser/widget-chooser.component";
import {PageListComponent} from "./views/page/page-list/page-list.component";
import {PageNewComponent} from "./views/page/page-new/page-new.component";
import {PageEditComponent} from "./views/page/page-edit/page-edit.component";
import {WidgetListComponent} from "./views/widget/widget-list/widget-list.component";
import {WidgetEditComponent} from "./views/widget/widget-edit/widget-edit.component";
import {WidgetHeaderComponent} from "./views/widget/widget-edit/widget-header/widget-header.component";
import {WidgetImageComponent} from "./views/widget/widget-edit/widget-image/widget-image.component";
import {WidgetYoutubeComponent} from "./views/widget/widget-edit/widget-youtube/widget-youtube.component";
import {WidgetHtmlComponent} from "./views/widget/widget-edit/widget-html/widget-html.component";
import {WidgetTextComponent} from "./views/widget/widget-edit/widget-text/widget-text.component";
import {FlickrImageSearchComponent} from "./views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component";

const appRoutes: Routes = [
  //path from root
  {path: '', component : LoginComponent},
  {path: 'login', component : LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'user/website', component: WebsiteListComponent, canActivate: [AuthGuard]},
  {path: 'user/website/new', component: WebsiteNewComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid', component: WebsiteEditComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid/page', component: PageListComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid/page/new', component: PageNewComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid/page/:pid', component: PageEditComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid/page/:pid/widget', component: WidgetListComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid/page/:pid/widget/new', component: WidgetChooserComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid/page/:pid/widget/:wgid', component: WidgetEditComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid/page/:pid/widget/:wgid/flickr', component: FlickrImageSearchComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid/page/:pid/widget/new/header', component: WidgetHeaderComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid/page/:pid/widget/new/image', component: WidgetImageComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid/page/:pid/widget/new/youtube', component: WidgetYoutubeComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid/page/:pid/widget/new/html', component: WidgetHtmlComponent, canActivate: [AuthGuard]},
  {path: 'user/website/:wid/page/:pid/widget/new/text', component: WidgetTextComponent, canActivate: [AuthGuard]},

];

export const routing = RouterModule.forRoot(appRoutes);
