import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateUserService } from '../services/create-user.service';
import { InfoDialog } from '../services/info-dialog.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  isSubmitted = false;
  roles: {
    key: string;
    id: number;
    description: string;
  }[];

  constructor(
    public formBuilder: FormBuilder,
    public createUser: CreateUserService,
    public infoDialog: InfoDialog
  ) {}

  async ngOnInit() {
    this.userForm = this.formBuilder.group(
      {
        userName: ['', [Validators.minLength(8)]],
        firstName: [''],
        lastName: [''],
        address: [''],
        phoneNo: [''],
        psw: ['', [this.createUser.validatePassword]],
        pswRepeat: [''],
        role: ['', Validators.required],
        email: ['', [this.createUser.validateEmail]],
      },
      { validators: this.createUser.matchPassword }
    );
    this.roles = await this.createUser
      .getRoles()
      .then((data) => data)
      .catch((err) => {
        this.infoDialog.display('Info', 'Internal Server Error');
        return [];
      });
  }
  get formControls() {
    return this.userForm.controls;
  }

  create = async () => {
    this.isSubmitted = true;
    if (!this.userForm.valid) {
      return;
    }
    const formValue = this.userForm.value;
    const user = {
      username: formValue.userName,
      password: formValue.psw,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phoneNo: formValue.phoneNo,
      address: formValue.address,
      rolesId: this.createUser.roleIdMapping[formValue.role],
    };
    await this.createUser.create(user);
    this.infoDialog.display('Info', 'User Created Successfuly');
  };
}
