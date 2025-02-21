import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../content/models/customer';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiBaseUrl}/api/Customer`);
  }
  getCustomerById(Id: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiBaseUrl}/api/Customer/${Id}`);
  }
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.apiBaseUrl}/api/Customer`, customer);
  }
  updateCustomer(Id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${environment.apiBaseUrl}/api/Customer/${Id}`, customer);
  }
  deleteCustomer(Id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/Customer/${Id}`);
  }
}
