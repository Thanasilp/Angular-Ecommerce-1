import { CartItem } from './../interfaces/Cart-items';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // private cartItems = new BehaviorSubject<CartItem[]>([]);
  // CartItems$ = this.cartItems.asObservable();

  // ใช้ signal แทน BehaviorSubject
  private cartItems = signal<CartItem[]>(this.loadCartFromStorage());

  // Getter สำหรับดึงข้อมูลลูกค้า
  getCartItems() {
    console.log(this.cartItems());

    return this.cartItems();
  }

  addToCart(item: CartItem) {
    let items = [...this.cartItems()];
    const existingItem = items.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({ ...item, quantity: 1 });
    }

    this.cartItems.set(items);
    this.saveCartToStorage();
  }

  saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  removeFromCart(id: string): string | null {
    const updatedCart = this.cartItems().filter((item) => item.id !== id); // ลบสินค้าออกจาก cartItems
    const removedItem = this.cartItems().find((item) => item.id === id); // ค้นหาสินค้าที่ถูกลบ

    if (removedItem) {
      this.cartItems.set(updatedCart); // อัพเดต cartItems
      this.saveCartToStorage(); // อัพเดต localStorage ด้วยค่าที่อัพเดตแล้ว
      return removedItem.name; // คืนค่าชื่อสินค้าที่ถูกลบ
    }

    return null;
  }

  clearCart() {
    this.cartItems.set([]);
    localStorage.removeItem('cart');
  }

  loadCartFromStorage(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
}
