import {
  CreateCustomerComponent,
  CreateCustomerModel,
} from '../create-customer/create-customer.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateCustomer {
  constructor(public dialog: MatDialog) {}

  display = () => {
    const dialogData = new CreateCustomerModel;

    const dialogRef = this.dialog.open(CreateCustomerComponent, {
      data: dialogData,
    });

    return dialogRef.afterClosed();
  };
}
