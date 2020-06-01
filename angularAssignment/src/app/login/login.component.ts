import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  alertMessage;
  type;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  pswdValidator = (control: FormControl) => {
    let password = control.value;
    let count = [0, 0, 0, 0];
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= '0' && password[i] <= '9') {
        count[0] = 1;
      } else if (password[i] >= 'A' && password[i] <= 'Z') {
        count[1] = 1;
      } else if (password[i] >= 'a' && password[i] <= 'z') {
        count[2] = 1;
      } else {
        count[3] = 1;
      }
    }
    for (let i in count) {
      if (count[i] !== 1) {
        return { pswd: 'invalid' };
      }
    }
    return null;
  };

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, this.pswdValidator]],
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }

  async login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const error: HttpErrorResponse | null = await this.authService.logIn(
      this.loginForm.value
    );
    if (error) {
      this.type = 'danger';
      switch (error.status) {
        case 404:
          this.alertMessage = 'Username does not exist';
          break;
        case 401:
          this.alertMessage = 'Password is inncorrect.Please login again';
          break;
      }
    } else {
      this.type = "success";
      this.alertMessage = 'User logged in successfully';
      // this.router.navigate(['/users']);
    }
  }
}
