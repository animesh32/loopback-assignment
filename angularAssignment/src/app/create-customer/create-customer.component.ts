import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  form:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateCustomerModel,
    public formBuilder:FormBuilder
  ){}


  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:['',Validators.required],
      website:['',Validators.required],
      address:['']
    })
  }

  onConfirm(): void {
    if(!this.form.valid){
      return
    }
    // Close the dialog, return true
    this.dialogRef.close(this.form.value);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(null);
  }

}
export class CreateCustomerModel{

}