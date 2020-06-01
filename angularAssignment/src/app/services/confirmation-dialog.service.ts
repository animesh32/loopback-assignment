import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
  })
export class ConfirmDialog {
  constructor(public dialog: MatDialog) {}

  display=(title:string,message:string)=>{
    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
    });

    return dialogRef.afterClosed();
  }
}
