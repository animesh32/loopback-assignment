import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InfoDialog } from '../services/info-dialog.service';
import { Configs } from '../enums/configs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customerList;
  link:string;
  displayedColumns: string[] = [
    'name',
    'website',
    'address',
  ];
  constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private infoDialog: InfoDialog
  ) {}

  getCustomerList = async () => {
    this.customerList = await this.http
      .get(this.link)
      .toPromise()
      .then((data) => data)
      .catch((err) => {
        this.infoDialog.display('Info', 'Internal Server Error');
        return [];
      });
  };

  async ngOnInit() {
    this.router.params.subscribe(data=>{
      this.link=`${Configs.getUsers}/${data.id}/customers`;
    })
    console.log(this.link)
    await this.getCustomerList();
  }

  
}
