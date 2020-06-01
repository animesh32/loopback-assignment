import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InfoDialog } from '../services/info-dialog.service';
import { Configs } from '../enums/configs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersList;
  displayedColumns: string[] = [
    'name',
    'email',
    'address',
    'phoneNo',
    'action',
  ];
  constructor(
    private router: Router,
    private http: HttpClient,
    private infoDialog: InfoDialog
  ) {}

  getUsersList = async () => {
    this.usersList = await this.http
      .get(Configs.getUsers)
      .toPromise()
      .then((data) => data)
      .catch((err) => {
        this.infoDialog.display('Info', 'Internal Server Error');
        return [];
      });
  };

  async ngOnInit() {
    await this.getUsersList();
    console.log(this.usersList)
    for (const i in this.usersList) {
      this.usersList[
        i
      ].name = `${this.usersList[i].firstName} ${this.usersList[i].lastName}`;
    }
  }

  showCustomers = (element) => {
    this.router.navigate(['show-customers', element.id]);
  };

  createUser=()=>{
    this.router.navigate(['create-user'])
  }
}
