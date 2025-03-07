import { CartService } from './../../services/cart.service';
import { Component, inject, Input } from '@angular/core';
import { MenuItem } from '../../interfaces/Menu-items';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartItem } from '../../interfaces/Cart-items';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-list',
  imports: [CommonModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class MenuListComponent {
  private cartService = inject(CartService);
  private toastr = inject(ToastrService);

  @Input() menuItems: MenuItem[] = [];

  addToCart(item: MenuItem) {
    console.log('item added in menu-list');
    // ปกติสามารถเขียนแบบนี้ได้เลย แต่ว่า object จริงๆมี id => _id
    // const cartItem: CartItem = { ...item, quantity: 1 };
    const cartItem: CartItem = {
      productId: item._id, // เปลี่ยน _id จาก MenuItem เป็น id สำหรับ CartItem
      name: item.name,
      price: item.price,
      image: item.imagePublicId,
      quantity: 1,
    };
    this.cartService.addToCart(cartItem);
    console.log(cartItem);
    this.toastr.success(
      `${item.name} has been added to your cart!`,
      'Item Added'
    );
  }
}
