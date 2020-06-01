import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Configs} from '../enums/configs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  pwdForm: FormGroup;
  alertMessage: string | null;
  isSubmitted: boolean;
  type: string | null;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.isSubmitted = false;
    this.type = null;
    this.alertMessage = null;
    this.pwdForm = this.formBuilder.group({
      old: ['', [Validators.required]],
      new: ['', [Validators.required, Validators.minLength(8),this.pswdValidator]],
    });
  }

  get formControls() {
    return this.pwdForm.controls;
  }
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

  change = async () => {
    this.isSubmitted = true;
    if (!this.pwdForm.valid) {
      this.alertMessage = 'form not valid';
      this.type = 'danger';
      return;
    }
    console.log(this.pwdForm.value);
    try {
      await this.http.patch(Configs.changePswd, this.pwdForm.value).toPromise();
      this.alertMessage = 'Password changed';
      this.type = 'success';
    } catch (err ){
      this.alertMessage = err.error.error.message;
      this.type = 'danger';
    }
  };
}
