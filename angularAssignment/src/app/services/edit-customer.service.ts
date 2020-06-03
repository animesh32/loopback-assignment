import {
  EditCustomerComponent,
  EditCustomerModel,
} from '../edit-customer/edit-customer.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditCustomer {
  constructor(public dialog: MatDialog) {}

  display = (element) => {
    const dialogData = new EditCustomerModel(
      element.name,
      element.website,
      element.address
    );

    const dialogRef = this.dialog.open(EditCustomerComponent, {
      data: dialogData,
    });

    return dialogRef.afterClosed();
  };
}
