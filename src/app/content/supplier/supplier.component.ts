import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [HttpClientModule,CommonModule,ReactiveFormsModule,RouterModule,NgxPaginationModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent {

}
