import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-success-pay',
  templateUrl: './success-pay.component.html',
  styleUrls: ['./success-pay.component.css']
})
export class SuccessPayComponent implements OnInit {

  notLoading: boolean = true;
  orderID: any;
  order: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
    ) { }

  ngOnInit(): void {

    this.route.queryParams.pipe(
      filter((params: any) => params.order_id))
      .subscribe((params: any) => {
        this.orderID = params.order_id;
      }
    );

    this.getOrder();

    setTimeout(() => {
      this.notLoading = false;
    }, 1500);
  }

  getOrder(): void {
    this.orderService.getOrder(this.orderID).subscribe(
      (res: any) => {
        console.log(res);
        this.order = res[0];
      }
    )
  }

  removeLS(): void {
    localStorage.removeItem('products');
    localStorage.removeItem('direction');
  }

}
