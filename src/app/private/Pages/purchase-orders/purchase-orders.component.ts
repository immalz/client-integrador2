import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import {UserOptions} from 'jspdf-autotable';

interface jsPDFWidthPlugin extends jsPDF {
  autoTable : (options: UserOptions) => jsPDF;
}

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.css']
})
export class PurchaseOrdersComponent implements OnInit, AfterViewInit  {

  userID: number = 0;
  orders: object[] = [];

  displayedColumns: string[] = ['Orden', 'Productos', 'Total', 'Estado','Fecha'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { 
     this.dataSource = new MatTableDataSource(this.orders);
  }

  ngOnInit(): void {
    this.userID = Number(localStorage.getItem('user'));
    this.getOrder();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getOrder() {
    this.orderService.getOrderByBuller(this.userID).subscribe(
      (res: any) => {
        for (const item of res) {
          item.linea = JSON.parse(item.linea)
        }
        this.orders = res;
        this.dataSource.data = res.reverse();
      }
    )
  }

  
  exportExcel(): void {
    const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWidthPlugin;

    doc.text('Ordenes de Compra', 180, 20);

    let body: any = [];

    this.orders.forEach((element: any) => {

      let products: any = [];
      let order: any = this.orders;

      for (const product of element.linea) {
        products.push(product.nombre)
        console.log(products);
      }
      console.log(element.linea);
      let temp = [element.id_pedido, products, element.total , element.status, new Date(element.date).toLocaleDateString()];
      body.push(temp);
    });

    doc.autoTable({
      head: [['N° de Orden', 'Productos', 'Monto', 'Estado', 'Fecha de Compra']],
      body: body,

    })
    
    doc.save('Reporte de Ordenes de Compra.pdf');
  }

}