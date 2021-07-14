import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AmountService } from '../../services/amount.service';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  formData!: FormGroup;
  id: any;
  textMode: string = 'Agregar Producto'
  categories: any = [];
  public mode: string = '';
  public dataProduct: any = [];

  constructor(
    private _snackBar: MatSnackBar,
    private builder: FormBuilder,
    private amountService: AmountService,
    public dialogRef: MatDialogRef<AddDataComponent>,
    private productService: ProductService,
    private categorieService: CategoryService

  ) {
  }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user') || '{}');
    this.getCategory();
    this.setForm();
    this.mode !== 'create' ? this.setData() : null;
  }

  setForm(): void {
    this.formData = this.builder.group({
      codCategoria: ['', Validators.required],
      codVendedor: [this.id, Validators.required],
      nombre: ['', Validators.required],
      description: ['', Validators.required],
      imagen:['', Validators.required],
      precio: [null, Validators.required],
      stock: [null, Validators.required],
    });
  }

  getCategory(): void {
    this.categorieService.getCategories().subscribe(
      (res: object[]) => {
        console.log(res);
        this.categories = res;
      }
    )
  }

  setData(): any {
    console.log(this.dataProduct);

    this.textMode = 'Actualizar Producto';

    this.formData.patchValue({
      codCategoria:this.dataProduct.codCategoria,
      codVendedor: this.id,
      nombre:this.dataProduct.nombre,
      description:this.dataProduct.description,
      imagen:this.dataProduct.imagen,
      precio: this.dataProduct.precio,
      stock: this.dataProduct.stock,
    });
  }

  save(): void {
    this.productService.createProduct(this.formData.value).subscribe(
      (res: any) => {
        console.log(res);
        this._snackBar.open(res['message'], 'cerrar');
        this.dialogRef.close();
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.dataProduct.Codproducto).subscribe(
      (res: any) => {
        this._snackBar.open(res['message'], 'cerrar');
        this.dialogRef.close();
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  updateAmount(): void {
    const payload = {
      codCategoria:this.formData.get('codCategoria')?.value,
      codVendedor: this.formData.get('codVendedor')?.value,
      nombre: this.formData.get('nombre')?.value,
      description: this.formData.get('description')?.value,
      imagen:this.formData.get('imagen')?.value,
      precio: this.formData.get('precio')?.value,
      stock: this.formData.get('stock')?.value,
    }
    this.productService.updateProduct(payload, this.dataProduct.Codproducto).subscribe(
      (res: any) => {
        this._snackBar.open(res['message'], 'cerrar');
        this.dialogRef.close();
      },
      (err: any) => {
        console.log(err);
      }
    )
  }


}
