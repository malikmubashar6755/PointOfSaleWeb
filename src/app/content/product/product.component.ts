import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../service/product-service.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product/product';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule,CommonModule,ReactiveFormsModule,RouterModule,NgxPaginationModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  productForm!: FormGroup;
  currentPage: number = 1;
  itemsPerPage: number = 10; // Show 10 rows per page
  constructor(private productService : ProductServiceService){

  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      
    });
  }
  deleteProduct(productId: number): void {
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
        this.productService.deleteProduct(productId).subscribe(() => {
          this.products = this.products.filter(p => p.ProductId !== productId);
          
          Swal.fire({
            title: 'Deleted!',
            text: 'Product has been deleted successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        });
      }
    });
  }

}
