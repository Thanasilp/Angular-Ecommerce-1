import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './../interfaces/Cart-items';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:4000/cart'; // URL ของ API Backend

  // ใช้ signal แทน Observable
  cartItems = signal<CartItem[]>([]);

  constructor(private http: HttpClient) {}

  // โหลดตะกร้าและอัปเดต signal
  fetchCartItems() {
    this.http
      .get<{ success: boolean; message: string; cart: any }>(this.apiUrl)
      .subscribe((response) => {
        this.cartItems.set(response.cart.items); // อัปเดตค่าใน signal
      });
  }

  // เพิ่มสินค้าในตะกร้า
  addToCart(item: CartItem) {
    this.http
      .post<{ success: boolean; message: string }>(this.apiUrl, item)
      .subscribe(() => {
        this.cartItems.update((items) => [...items, item]); // อัปเดตรายการสินค้า
      });
  }

  // อัปเดตสถานะสินค้าในตะกร้า
  updateQuantity(productId: string, quantity: number) {
    this.http
      .put<{ success: boolean; message: string }>(`${this.apiUrl}`, {
        productId,
        quantity,
      })
      .subscribe(() => {
        this.cartItems.update((items) =>
          items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          )
        );
      });
  }

  // ลบสินค้าออกจากตะกร้า
  removeFromCart(productId: string) {
    this.http
      .delete<{ success: boolean; message: string }>(
        `${this.apiUrl}/${productId}`
      )
      .subscribe(() => {
        this.cartItems.update((items) =>
          items.filter((item) => item.productId !== productId)
        );
        // console.log('Updated cartItems:', this.cartItems()); // 🛠 Debug ดูว่าค่าเปลี่ยนจริงไหม
      });
  }

  // ล้างตะกร้าทั้งหมด
  clearCart() {
    this.http
      .delete<{ success: boolean; message: string }>(this.apiUrl)
      .subscribe(() => {
        this.cartItems.set([]); // เคลียร์ตะกร้า
      });
  }
}
