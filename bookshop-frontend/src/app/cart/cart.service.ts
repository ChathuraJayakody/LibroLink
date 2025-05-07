import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateCartItem(bookId: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/item`, { bookId, quantity });
  }

  removeCartItem(bookId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/item/${bookId}`);
  }
}
