import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../content/models/product/product';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient) { }

  getAllProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/api/Product`);
  }
  getProductById(Id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/api/Product/${Id}`);
}
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiBaseUrl}/api/Product`, product);
  }
  updateProduct(Id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.apiBaseUrl}/api/Product/${Id}`, product);
  }
  deleteProduct(Id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/Product/${Id}`);
  }
}
