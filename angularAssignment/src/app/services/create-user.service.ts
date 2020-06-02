import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Configs } from '../enums/configs';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  roleIdMapping: { [prop: string]: number } = {};
  constructor(public http: HttpClient) {}

  validateEmail(control: FormControl) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)) {
      return null;
    }
    return { email: 'invalid' };
  }
  validatePassword(control: FormControl) {
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
  matchPassword = (form: FormGroup) => {
    if (form.controls.psw.value !== form.controls.pswRepeat.value) {
      return {
        match: 'invalid',
      };
    }
    return null;
  };
  getRoles = async () => {
    let roles = await this.http
      .get<
        {
          key: string;
          id: number;
          description: string;
        }[]
      >(Configs.roles)
      .toPromise();
    roles.forEach((element) => {
      this.roleIdMapping[element.key] = element.id;
    });
    return roles;
  }

  async create(user){
    await this.http.post(Configs.postUser,user).toPromise();
  }
}
