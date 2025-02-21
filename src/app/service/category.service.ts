import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../content/models/category';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Category`);
  }
   getCategoryById(Id: number): Observable<Category[]> {
      return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Category/${Id}`);
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.apiBaseUrl}/api/Category`, category);
  }
  updateCategory(Id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Category/${Id}`, category);
  }
  deleteCategory(Id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/Category/${Id}`);
  }
}
