import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { Category } from '../models/category';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent implements OnInit,OnDestroy {
  isEditMode = false;
  categoryForm!: FormGroup;
  categoryId!: number;
  private routeSub!: Subscription; 
  private categorySub!: Subscription; 

  constructor(private fb: FormBuilder, private categoryService: CategoryService,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryDescription: ['', Validators.required],
      categoryIsActive: [false]
    });
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = params.get('Id');
      this.categoryId = id && !isNaN(+id) ? +id : 0;
      this.isEditMode = !isNaN(this.categoryId) && this.categoryId > 0;
      if (this.isEditMode) {
        this.loadCategoryForEdit();
      } 
    });
  }
  loadCategoryForEdit(): void {
    if (!this.categoryId) {
      console.error('Product ID is undefined.');
      return;
    }
  
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (categoryArray) => {
        if (!this.categoryForm) {
          console.error('Form is not initialized.');
          return;
        }
        if (!categoryArray || categoryArray.length === 0) {
          return;
        } 
        const category = categoryArray[0]; 
        this.categoryForm.patchValue({
          categoryName: category.CategoryName || '',
          categoryDescription: category.Description || '',
          categoryIsActive: category.IsActive || ''
        });
  
        console.log('After Patch:', this.categoryForm.value);
      },
      error: (err) => console.error('Error loading product:', err)
    });
  }
  ngOnDestroy(): void {

      this.routeSub.unsubscribe();
      this.categorySub.unsubscribe();
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryData: Category = {
        CategoryId: this.isEditMode ? this.categoryId! : 0,
        CategoryName: this.categoryForm.value.categoryName,
        Description: this.categoryForm.value.categoryDescription,
        IsActive: this.categoryForm.value.categoryIsActive
      };
      if (this.isEditMode) {
        this.categoryService.updateCategory(this.categoryId!, categoryData).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Success!',
              text: 'Category updated successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });

            //this.router.navigate(['/categories']); // Navigate back to the product list
          },
          error: (error) => {
            console.error('Error updating product:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error updating product. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
      } else {
        this.categoryService.createCategory(categoryData).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Success!',
              text: 'Category created successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });

            this.categoryForm.reset();
          },
          error: (error) => {
            console.error('Error creating category:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error creating category. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    } else {
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
