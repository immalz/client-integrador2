import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  saveOrder(payload: any): any {
    return this.http.post<any>(environment.dev + `pedido`, payload);
  }

  getOrders(): any {
    return this.http.get<any>(environment.dev + `pedido`);
  }

  getOrder(id: any): any {
    return this.http.get<any>(environment.dev + `pedido/${id}`);
  }

  getOrderBySeller(id: any): any {
    return this.http.get<any>(environment.dev + `pedido/getPedidovendedor/${id}`);
  }
  getOrderByBuller(id: any): any {
    return this.http.get<any>(environment.dev + `pedido/getPedidocliente/${id}`);
  }
}
