import { Website } from '../models/website.model.client';
import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/Rx";
import {environment} from "../../environments/environment";

@Injectable()
export class WebsiteService {
  constructor(private http: Http){}

  baseUrl = environment.baseUrl;


  createWebsite(userId, website){
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this.http.post(url, website).map((response: Response) => {
      //console.log(response.json());
      return response.json();
    })
  }

  findWebsitesByUser(userId){
    const url = this.baseUrl +  '/api/user/' + userId + '/website';
    return this.http.get(url).map((response: Response) => {
      //console.log(response.json());
      return response.json();
    });
  }

  updateWebsite(newWebsite) {
    const url = this.baseUrl + '/api/website/' + newWebsite._id;
    return this.http.put(url, newWebsite).map((response: Response) => {
      return response.json();
    });
  }

  findWebsiteById(websiteId){
    //console.log(websiteId);
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.get(url).map((response: Response) => {
      //console.log(response);
      return response.json();
    });
  }

  deleteWebsite(websiteId){
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }
}
