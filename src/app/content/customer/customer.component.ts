import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Customer } from '../models/customer';
import { CustomerService } from '../../service/customer.service';
import { Subscription } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule,NgxPaginationModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit,OnDestroy{
   customers: Customer[] = [];
   currentPage: number = 1;
   itemsPerPage: number = 10;
   private customerSubscription!: Subscription;
constructor(private customerService:CustomerService){}
 
  ngOnInit(): void {
    this.loadallCustomers();
  }
  loadallCustomers(){
    this.customerSubscription = this.customerService.getAllCustomers().subscribe(
      (data) => {
        this.customers = data;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }
  deleteCustomer(customerId: number): void {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.customerService.deleteCustomer(customerId).subscribe(() => {
              this.customers = this.customers.filter(c => c.CustomerId !== customerId);
              
              Swal.fire({
                title: 'Deleted!',
                text: 'Customer has been deleted successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
              });
            });
          }
        });
      }
  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
  }
}
