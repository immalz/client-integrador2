import { AddDataComponent } from './../../Components/add-data/add-data.component';
import { OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RegisterBalanceComponent } from '../../Components/register-balance/register-balance.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { UserService } from '../../services/user.service';
import { AmountService } from '../../services/amount.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddBalanceComponent } from '../../Components/add-balance/add-balance.component';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import {UserOptions} from 'jspdf-autotable';
import { ProductService } from '../../services/product.service';

interface jsPDFWidthPlugin extends jsPDF {
  autoTable : (options: UserOptions) => jsPDF;
}

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})

export class EntryComponent implements OnInit  {

  id: any;
  user: any = [];
  products: any = [];

  constructor(
    public dialog: MatDialog,
    private perfil: PerfilComponent,
    private userService: UserService,
    private amountService: AmountService,
    private _snackBar: MatSnackBar,
    private productService: ProductService
  ) { 
  }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user') || '{}');
    this.getProducts();
  }

  
  getProducts(): any {
    console.log('me me llame');
   this.productService.getProducts().subscribe(
      (res: object[]) => {
        this.products = res;
        console.log(res);
      }
    )  
  }

  public addProduct(mode: string, row? : any): void {
    let dialogRef = this.dialog.open(AddDataComponent);
    console.log('entre');
    mode === 'create' ? dialogRef.componentInstance.mode = 'create' : dialogRef.componentInstance.dataProduct = row

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.perfil.ngOnInit();
    })
  }

  public addAlert(): any {
    let dialogRef = this.dialog.open(AddBalanceComponent);
    dialogRef.componentInstance.alert = this.user.alert;
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.perfil.ngOnInit();
    })
  }


  deleteAmount(id: any): any {
    console.log(id);
    this.amountService.deleteAmount(id).subscribe(
      (res: any) => {
        console.log(res);
        this._snackBar.open(res['message'], 'cerrar');
        this.ngOnInit();
      }
    )
  }

  // exportExcel(): void {
  //   const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWidthPlugin;

  //   doc.text('Reporte de Finanzas', 180, 20);

  //   let body: any = [];

  //   this.amounts.forEach((element: any) => {
  //     let value = '';
  //     let amount = 'S/ ' + element.amount + '.00';
  //     element.id_state === 1 ? value = 'Gasto' : value = 'Ingreso';
  //     let temp = [element.id_amount, element.name, amount , value, new Date(element.created_at).toLocaleDateString()];
  //     body.push(temp);
  //   });

  //   doc.autoTable({
  //     head: [['ID', 'Nombre', 'Monto Asignado', 'Tipo de Monto', 'Fecha de Registro']],
  //     body: body,

  //   })
    
  //   doc.save('Reporte de Ingresos.pdf');
  // }

}
