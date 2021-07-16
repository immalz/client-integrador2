import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DirectionRegisterComponent } from '../../Components/direction-register/direction-register.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  user: string | any;
  products: any = [];
  direction: any;
  haveDirection: boolean = false;
  notLoading: boolean = true;
  total: number = 0;
  payload: any;
  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private orderService: OrderService
  ) { 
    
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.products = localStorage.getItem('products');
    const temp = localStorage.getItem('direction');
    this.products = JSON.parse(this.products);

    this.setTotal();

    setTimeout(() => {
      this.notLoading = false;
    }, 1000);

    if(temp !== null) {
      this.direction = JSON.parse(temp);
      this.haveDirection = true;
    }
  }

  setTotal(): void {
    this.total = this.products.reduce((sum: any, value: any) => (typeof value.precio == "number" ? sum + value.precio : sum), 0);
    console.log(this.total);
  }

  openDialog() {
    this.dialog.open(DirectionRegisterComponent).afterClosed()
    .subscribe(response => {
      if(response !== undefined) {
        this.direction = response.data;
        this.haveDirection = true;
        localStorage.setItem('direction', JSON.stringify(response.data));
      }
    });;
  }


  success(): void {
    const payload = {
      cod_cliente: this.user,
      linea: JSON.stringify(this.products),
      status: 'PAGO RECIBICO',
      total: this.total
    }
    this.orderService.saveOrder(payload).subscribe(
      (res: any) => {
        console.log(res);
        const orderID = res.pedidoRegister.insertId;
        this.router.navigate(['/pago-exitoso'], {queryParams: {order_id: orderID}});  
      }
    )
  }
 
  removeProduct(product: any, event: any): void {
    event.stopPropagation();
    this.products = this.products.filter((element: any) => element.Codproducto !== product.Codproducto);
    this._snackBar.open(`Se Elimino el Producto: ${product.nombre}`, 'cerrar');
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}
