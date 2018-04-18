///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';
import {SharedService} from "../../../services/shared.service";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  username: String;
  password: String;
  baseUrl: String;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router) { }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.userService.login(this.username, this.password)
      .subscribe(
        (data: any) => {
          this.sharedService.user = data;
          this.errorFlag = false;
          //console.log(data);
          this.router.navigate(['/profile'])},
        (error: any) => {
          this.errorFlag = true;
        }
      );

  }

  ngOnInit() {
    this.baseUrl = environment.baseUrl;
  }

}
