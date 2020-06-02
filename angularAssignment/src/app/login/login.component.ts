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
    const password = control.value;
    const count = [0, 0, 0, 0];
    for (const i of password) {
      if (i >= '0' && i <= '9') {
        count[0] = 1;
      } else if (i >= 'A' && i <= 'Z') {
        count[1] = 1;
      } else if (i >= 'a' && i <= 'z') {
        count[2] = 1;
      } else {
        count[3] = 1;
      }
    }
    for (const i in count) {
      if (count[i] !== 1) {
        return { pswd: 'invalid' };
      }
    }
    return null;
  }

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
      this.type = 'success';
      this.alertMessage = 'User logged in successfully';
      // this.router.navigate(['/users']);
    }
  }
}
