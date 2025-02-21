
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductServiceService } from '../../service/product-service.service';
import { Product } from '../models/product/product';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Category } from '../models/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  categories: Category[] = [];
  isEditMode = false;
  productId!: number;
  constructor(
    private fb: FormBuilder,
    private productService: ProductServiceService, private categoryService: CategoryService, private router: Router,
    private route: ActivatedRoute, private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      productDescription: ['', Validators.required],
      productCategory: ['', Validators.required],
      productCost: ['', [Validators.required, Validators.min(0)]],
      productStock: ['', [Validators.required, Validators.min(0)]]
    });
    console.log('Form Initialized:', this.productForm);
    this.productId = +this.route.snapshot.paramMap.get('Id')!;
    this.isEditMode = !isNaN(this.productId) && this.productId > 0;
    if (this.isEditMode) {
      this.loadProductForEdit();
    }
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadProductForEdit(): void {
    if (!this.productId) {
      console.error('Product ID is undefined.');
      return;
    }

    this.productService.getProductById(this.productId).subscribe({
      next: (productArray) => {
        console.log('API Response:', productArray);
        if (!this.productForm) {
          console.error('Form is not initialized.');
          return;
        }
        if (!productArray || productArray.length === 0) {
          console.error('No product found with the given ID.');
          return;
        }
        const product = productArray[0];
        setTimeout(() => {  // Ensuring form is fully initialized before patching
          this.productForm.patchValue({
            productName: product.ProductName || '',
            price: product.Price || 0,
            productDescription: product.Description || '',
            productCategory: product.CategoryId || '',
            productCost: product.Cost_Price || 0,
            productStock: product.Stock_Quantity || 0
          });

          console.log('After Patch:', this.productForm.value);
        }, 100); // Delay for form stability
      },
      error: (err) => console.error('Error loading product:', err)
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: Product = {
        ProductId: this.isEditMode ? this.productId! : 0, // Set ProductId for edit mode
        ProductName: this.productForm.value.productName,
        CategoryId: this.productForm.value.productCategory,
        Description: this.productForm.value.productDescription,
        Price: this.productForm.value.price,
        Cost_Price: this.productForm.value.productCost,
        Stock_Quantity: this.productForm.value.productStock,
      };

      if (this.isEditMode) {
        // Edit mode: Call updateProduct
        this.productService.updateProduct(this.productId!, productData).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Success!',
              text: 'Product updated successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });

            this.router.navigate(['/products']); // Navigate back to the product list
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
        // Create mode: Call createProduct
        this.productService.createProduct(productData).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Success!',
              text: 'Product created successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });

            this.productForm.reset(); // Reset the form after successful submission
          },
          error: (error) => {
            console.error('Error creating product:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error creating product. Please try again.',
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
