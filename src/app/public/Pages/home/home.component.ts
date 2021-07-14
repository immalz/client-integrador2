import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/private/services/category.service';
import { ProductService } from 'src/app/private/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any = [];
  productsList: any = [];
  categories: any = [];

  constructor(
    private productService: ProductService,
    private categoriService: CategoryService
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

  filter(item: any): any {

    console.log(item);
    

    if (item === '1010') {
      this.products = this.productsList;

    } else {
      const temp = this.productsList.filter((element: any) => element.codCategoria === item)

      this.products = temp;
    }
    

  }

}
