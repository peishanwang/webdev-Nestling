import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {User} from "../../../models/user.model.client";
import {UserService} from "../../../services/user.service.client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  username: String;
  password: String;
  confirmPassword: String;
  errorMsg = 'Passwords are different!';
  errorFlag = false;

  constructor(
    private userService: UserService,
    private router: Router) { }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password1;
    this.confirmPassword = this.registerForm.value.password2;

    if (this.password == this.confirmPassword) {
      this.userService.register(this.username, this.password)
        .subscribe(
          (data: any) => {
            this.router.navigate(['/profile']);
          },
          (error: any) => {
            this.errorMsg = error._body;
            this.errorFlag = true;
          }
        );

    } else {
      this.errorMsg = 'Passwords are different!';
      this.errorFlag = true;
    }
  }

  ngOnInit() {
  }
}
