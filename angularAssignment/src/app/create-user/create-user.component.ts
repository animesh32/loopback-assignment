import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm:FormGroup;
  constructor(
   public formBuilder:FormBuilder

  ) { }

  ngOnInit(): void {
    this.userForm=this.formBuilder.group({
      userName:['',[Validators.required]],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      address:['',[Validators.required]],
      phoneNo:['',[Validators.required]],
      password:['',[Validators.required]],
      rePassword:['',[Validators.required]],
      role:['',[Validators.required]],
      email:['',[Validators.required]],
    })

  }

}
