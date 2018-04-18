import {Injectable} from '@angular/core';
import {User} from '../models/user.model.client';
import {Http, RequestOptions, Response} from '@angular/http';
import "rxjs/Rx";
import {environment} from "../../environments/environment";
import {SharedService} from "./shared.service";
import {Router} from "@angular/router";

@Injectable()
export class UserService {

  constructor(private http: Http,
              private sharedService: SharedService,
              private router: Router){}
  baseUrl = environment.baseUrl;
  options = new RequestOptions();

  loggedIn() {
    this.options.withCredentials = true;
    return this.http.post(this.baseUrl + '/api/loggedIn', '', this.options)
      .map(
        (res: Response) => {
          const user = res.json();
          if (user !== 0) {
            this.sharedService.user = user; // setting user as global variable using shared service
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }

  // add a logout API to post a logout request to the server. The API should return an observable
  // for the component to register a callback and receive a server response.
  logout() {
    const url = this.baseUrl + '/api/logout';
    this.options.withCredentials = true;
    return this.http.post(url, {}, this.options)
      .map((response: Response) => {
        return response; // not return a json object
      });
  }

  // posting a register request to the server.
  register (username, password) {
    const url = this.baseUrl + '/api/register';
    // create an object to keep track of the username and password
    const credentials = {
      username: username,
      password: password,
    };
    // turn on credentials to make sure the communication is secure
    this.options.withCredentials = true;
    // post the url and other staff to passport and convert back with json object
    return this.http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }


  login(username, password) {
    const url = this.baseUrl + '/api/login';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    // post the body encrypted
    return this.http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }



  createUser(user: User) {
    const url = this.baseUrl + '/api/user';
    return this.http.post(url, user).map((response: Response) => {
      return response.json();
    })
  }

  findUserById(userId) {
    return this.http.get(this.baseUrl + '/api/user/' + userId)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserByUsername(username: String) {
    return this.http.get(this.baseUrl + '/api/user?username=' + username)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserByCredentials(username, password) {
    //console.log(this.baseUrl + '/api/user?username=' + username + '&password=' + password);
    return this.http.get(this.baseUrl + '/api/user?username=' + username + '&password=' + password)
      .map((response: Response) => {
        //console.log(response.json());
        return response.json();
      });
  }


  updateUser(user) {
    const url = this.baseUrl + '/api/user/' + user._id;
    return this.http.put(url, user).map((response: Response) => {
      return response.json();
    });
  }

  deleteUser(userId: String) {
    return this.http.delete(this.baseUrl + '/api/user/' + userId)
      .map((response: Response) => {
        return response.json();
      });
  }
}
