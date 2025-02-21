import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Customer } from '../models/customer';
import { CustomerService } from '../../service/customer.service';
import { response } from 'express';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css'
})
export class CustomerCreateComponent implements OnInit {
  isEditMode: boolean = false;
  customerForm!: FormGroup;
  routeSubscription?: Subscription;
  customerId!: number;
  constructor(private fb: FormBuilder, private customerService: CustomerService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', Validators.required],
      customerPhoneNum: ['', Validators.required],
      customerAddress: ['', Validators.required],
      //   customerCountry: ['', Validators.required],
      // customerState: ['', Validators.required],
      customerIsActive: [false]
    });
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('Id');
      this.customerId = id && !isNaN(+id) ? +id : 0;
      this.isEditMode = !isNaN(this.customerId) && this.customerId > 0;
      if (this.isEditMode) {
        this.loadCustomerForEdit();
      }
    });
  }
  loadCustomerForEdit(): void {
    debugger;
    if (!this.customerId) {
      console.error('Product ID is undefined.');
      return;
    }
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customerArray) => {
        if (!this.customerForm) {
          return;
        }
        if (!customerArray || customerArray.length === 0) {
          return;
        }
        const customer = customerArray[0];
        this.customerForm.patchValue({
          customerName: customer.CustomerName || '',
          customerEmail: customer.CustomerEmail || '',
          customerAddress: customer.CustomerAddress || '',
          customerPhoneNum: customer.PhoneNumber || '',
          customerIsActive: customer.IsActive || ''
        });
      },
      error: (err) => console.error('Error loading product:', err)
    });
  }
  onSubmit() {
    if (this.customerForm.valid) {
      const customerData: Customer = {
        CustomerId: this.isEditMode ? this.customerId! : 0,
        CustomerName: this.customerForm.value.customerName,
        CustomerEmail: this.customerForm.value.customerEmail,
        PhoneNumber: this.customerForm.value.customerPhoneNum,
        CustomerAddress: this.customerForm.value.customerAddress,
        IsActive: this.customerForm.value.customerIsActive
      };
      if (this.isEditMode) {
        this.customerService.updateCustomer(this.customerId!, customerData).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Success!',
              text: 'Customer updated successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });

            //this.router.navigate(['/categories']); // Navigate back to the product list
          },
          error: (error) => {
            console.error('Error updating customer:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error updating customer. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
      } else {
        this.customerService.createCustomer(customerData).subscribe({
          next: (response) => {
            console.log('Data Past', response);
            Swal.fire({
              title: 'Success!',
              text: 'Customer created successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });

            this.customerForm.reset();
          },
          error: (error) => {
            console.error('Error creating customer:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error creating customer. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    }
    else {
      console.log('Form is invalid');
      Swal.fire({
        title: 'Invalid Form!',
        text: 'Please fill out all required fields correctly.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
}
