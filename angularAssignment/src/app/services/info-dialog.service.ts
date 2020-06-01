import { ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../confirm-dialog/info-dialog.component';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
  })
export class InfoDialog {
  constructor(private dialog: MatDialog) {}
  display=(title:string,message:string)=>{
    const dialogData=new ConfirmDialogModel(title,message)
    this.dialog.open(InfoDialogComponent,{
      data:dialogData
    });
  }
}
