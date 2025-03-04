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
  cartItems = this.cartService.getCartItems(); // ✅ ไม่ต้องใช้ async pipe ใน HTML

  // cartItems$ = this.cartService.getCartItems();

  removeFromCart(id: number) {
    const itemName = this.cartService.removeFromCart(id); // รับชื่อสินค้าที่ถูกลบ
    this.cartItems = this.cartService.getCartItems(); // อัพเดตค่าหลังการลบสินค้า

    if (itemName) {
      this.toastr.warning(`${itemName} has been removed!`, 'Item removed!');
    }
  }
}
