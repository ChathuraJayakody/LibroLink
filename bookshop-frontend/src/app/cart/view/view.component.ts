import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  cartItems: any[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cartItems = cart.items;
        this.total = cart.total;
      },
      error: () => {
        this.cartItems = [];
        this.total = 0;
      }
    });
  }

  updateQuantity(item: any, quantity: number): void {
    if (quantity < 1) return;
    this.cartService.updateCartItem(item.bookId, quantity).subscribe({
      next: () => this.loadCart()
    });
  }

  removeItem(item: any): void {
    this.cartService.removeCartItem(item.bookId).subscribe({
      next: () => this.loadCart()
    });
  }
}
