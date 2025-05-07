import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  error = '';

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrderHistory().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load order history.';
        this.loading = false;
      }
    });
  }
}
