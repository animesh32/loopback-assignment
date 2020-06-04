import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InfoDialog } from '../services/info-dialog.service';
import { Configs } from '../enums/configs';
import { CreateCustomer } from '../services/create.customer.service';
import { EditCustomer } from '../services/edit-customer.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customerList;
  link: string;
  displayedColumns = ['username', 'email', 'userFirstName', 'action'];
  constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private infoDialog: InfoDialog,
    public createCustomerService: CreateCustomer,
    public edit: EditCustomer
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
    this.router.params.subscribe((data) => {
      this.link = `${Configs.getUsers}/${data.id}/customers`;
    });
    console.log(this.link);
    await this.getCustomerList();
  }
  createCustomer() {
    this.createCustomerService.display().subscribe(async (data) => {
      if (data) {
        await this.http.post(this.link, data).toPromise();
        await this.getCustomerList();
      }
    });
  }
  async deleteCustomer(el) {
    await this.http.delete(`${Configs.customer}/${el.id}`).toPromise();
    await this.getCustomerList();
  }

  editCustomer(el) {
    this.edit.display(el).subscribe(async (data) => {
      if (data) {
        await this.http.patch(`${Configs.customer}/${el.id}`, data).toPromise();
        await this.getCustomerList();
      }
    });
  }
}
