import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): any {
    return this.http.get<any>(environment.dev + `producto`);
  }

  getProduct(id: any): any {
    return this.http.get<any>(environment.dev + `producto/${id}`);
  }
  getProductByUser(id: any): any {
    return this.http.get<any>(environment.dev + `producto/products${id}`);
  }

  createProduct(payload: any): any {
    return this.http.post<any>(environment.dev + `producto`, payload);
  }

  updateProduct(payload: any, id: any): any {
    return this.http.put<any>(environment.dev + `producto/${id}`, payload);
  }

  deleteProduct(id: any): any {
    return this.http.delete<any>(environment.dev + `producto/${id}`);
  }

}
