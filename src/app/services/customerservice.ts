import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomerService {
    getData() {
        return [
            {
             taskId:0,
             listId:0,
             taskName:"taskName",
             endDate: '2019-02-09',
             state: false,
            }
        ];
    }

    constructor(private http: HttpClient) {}
    
    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    }


    getCustomers(params?: any) {
        return this.http.get<any>('https://www.primefaces.org/data/customers', { params: params }).toPromise();
    }
};