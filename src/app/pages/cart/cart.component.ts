import { CartItem } from './../../interfaces/Cart-items';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  // ใช้ signal ของ service
  cartItems = this.cartService.cartItems;

  isLoading = true;
  ngOnInit() {
    this.cartService.fetchCartItems();
    setTimeout(() => {
      this.isLoading = false;
    }, 500); // หน่วงเวลาให้ UI มีเวลาปรับตัว
  }

  // เพิ่มจำนวนสินค้า
  increaseQuantity(item: any) {
    if (item.quantity >= 100) {
      this.toastr.info(
        'ต้องการมากกว่า 100 ชิ้น? โปรดติดต่อร้านค้า',
        'แจ้งเตือน'
      );
      return;
    }
    item.quantity++;
    this.updateQuantity(item);
  }

  // ลดจำนวนสินค้า
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }

  // ฟังก์ชันลบตะกร้าสินค้า
  removeFromCart(id: string) {
    this.cartService.removeFromCart(id);
    this.toastr.warning('Item removed!', 'Removed');
  }

  // ฟังก์ชันอัปเดตจำนวนสินค้า
  updateQuantity(item: any) {
    if (item.quantity < 1) {
      item.quantity = 1; // ป้องกันค่าติดลบ
    }
    this.cartService.updateQuantity(item.productId, item.quantity);
  }

  // คำนวณราคาสินค้ารวม
  calculateTotal(): number {
    return this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // ฟังก์ชันยืนยันการทำรายการ
  checkout() {
    this.router.navigate(['address']);
  }

  clearCart() {
    this.cartService.clearCart();
    this.toastr.info('Cart cleared!', 'Info');
  }
}
