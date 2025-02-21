import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from '../../service/category.service';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [HttpClientModule,CommonModule,ReactiveFormsModule,RouterModule,NgxPaginationModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
categories: Category[] = [];
currentPage: number = 1;
itemsPerPage: number = 10;

constructor(private categoryService: CategoryService){

}
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data) =>{
     this.categories = data;
     console.log('Category_List',this.categories);
    });
  }
  deleteCategory(categoryId: number): void {
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
          this.categoryService.deleteCategory(categoryId).subscribe(() => {
            this.categories = this.categories.filter(c => c.CategoryId !== categoryId);
            
            Swal.fire({
              title: 'Deleted!',
              text: 'Category has been deleted successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          });
        }
      });
    }
}
