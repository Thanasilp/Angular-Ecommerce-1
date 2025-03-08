import { CartItem } from './../../interfaces/Cart-items';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private cartService = inject(CartService);
  private toastr = inject(ToastrService);

  // ใช้ signal ของ service
  cartItems = this.cartService.cartItems;

  constructor() {
    this.cartService.fetchCartItems(); // โหลดข้อมูลตะกร้าเมื่อ component ถูกสร้าง
  }

  removeFromCart(id: string) {
    this.cartService.removeFromCart(id);
    this.toastr.warning('Item removed!', 'Removed');
  }

  clearCart() {
    this.cartService.clearCart();
    this.toastr.info('Cart cleared!', 'Info');
  }
}
