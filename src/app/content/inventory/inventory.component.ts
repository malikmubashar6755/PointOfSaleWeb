import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [HttpClientModule,CommonModule,ReactiveFormsModule,RouterModule,NgxPaginationModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

}
