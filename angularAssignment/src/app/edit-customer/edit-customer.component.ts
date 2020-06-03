import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  el: {
    name: string;
    website: string;
    address: string;
  };
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditCustomerModel,
    public formBuilder: FormBuilder
  ) {
    this.el = { name: data.name, website: data.website, address: data.address };
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.el.name],
      website: [this.el.website],
      address: [this.el.address],
    });
  }

  onConfirm(): void {
    if (!this.form.valid) {
      return;
    }
    // Close the dialog, return true
    this.dialogRef.close(this.form.value);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(null);
  }
}
export class EditCustomerModel {
  constructor(
    public name: string,
    public website: string,
    public address: string
  ) {}
}
