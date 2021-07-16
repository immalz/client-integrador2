import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/private/services/category.service';
import { ProductService } from 'src/app/private/services/product.service';
import { NavbarComponent } from '../../Components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any = [];
  productsList: any = [];
  categories: any = [];

  lsProduct: any = [];

  constructor(
    private productService: ProductService,
    private categoriService: CategoryService,
    private header: NavbarComponent,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCategory();
    this.getProducts();
  }

  getCategory(): any {
    this.categoriService.getCategories().subscribe(
      (res: any) => {
        this.categories = res;
        console.log(res);
      }
    )
  }

  getProducts(): any {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.products = res; 
        this.productsList = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  checkCart(item: object): void {
    this.lsProduct = localStorage.getItem('products');
    this.lsProduct = JSON.parse(this.lsProduct);
    this.lsProduct === null ? this.addToCart(item, 'empty') : this.addToCart(item, 'full')
  }

  addToCart(item: any, status: string): void {
    let temp = [];
    if(status === 'empty') {
      temp.push(item);
    } else {
      temp = this.lsProduct;
      temp.push(item);
    }
    this._snackBar.open(`Se agrego el Producto: ${item.nombre}`, 'cerrar');
    localStorage.setItem('products', JSON.stringify(temp));
    this.header.ngOnInit();
  }

  filter(item: any): any {
    if (item === '1010') {
      this.products = this.productsList;
    } else {
      const temp = this.productsList.filter((element: any) => element.codCategoria === item)
      this.products = temp;
    }
  }

}
