import { NgContentAst } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  logged: boolean = false;
  products: any = [];
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.products = localStorage.getItem('products');
    this.products = JSON.parse(this.products);
    this.user !== null ? this.logged = true : this.logged = false;

  }

  checkProducts(): void {
    this.products = localStorage.getItem('products');
    this.products = JSON.parse(this.products);
  }

  loggout(): any {
    localStorage.removeItem('user');
    this.router.navigate(['/'])
  }

  removeProduct(product: any, event: any): void {
    event.stopPropagation();
    this.products = this.products.filter((element: any) => element.Codproducto !== product.Codproducto);
    this._snackBar.open(`Se Elimino el Producto: ${product.nombre}`, 'cerrar');

    localStorage.setItem('products', JSON.stringify(this.products));
  }

  checkout(): any {
    this.router.navigate(['/procesar-pago']);
  }

}
