import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InfoDialog } from '../services/info-dialog.service';
import { Configs } from '../enums/configs';
import { AuthenticationService } from '../services/authentication.service';
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
    public router: Router,
    public http: HttpClient,
    public infoDialog: InfoDialog,
    public authService: AuthenticationService
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
    for (const i in this.usersList) {
      this.usersList[
        i
      ].name = `${this.usersList[i].firstName} ${this.usersList[i].lastName}`;
    }
  }

  showCustomers = (element) => {
    this.router.navigate(['show-customers', element.id]);
  };
  deleteUser = async (element) => {
    if (element.username === this.authService.loggedUser) {
      this.infoDialog.display('Info', 'Cannot delete current user');
      return;
    }
    await this.http.delete(`${Configs.getUsers}/${element.id}`).toPromise();
    let temp=[];
    this.usersList.forEach((el) => {
      if (el.id !== element.id) {
        temp.push(el)
      }
    });
    this.usersList=temp;
    this.infoDialog.display('Info', 'User deleted Successfuly');
  };

  createUser = () => {
    this.router.navigate(['create-user']);
  };
}
