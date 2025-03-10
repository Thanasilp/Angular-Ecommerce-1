import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  private cartService = inject(CartService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  cartItems = this.cartService.cartItems;

  deliveryForm!: FormGroup;

  constructor() {
    this.cartService.fetchCartItems(); // โหลดข้อมูลตะกร้าเมื่อ component ถูกสร้าง
  }

  ngOnInit(): void {
    //สร้างฟอร์มด้วย FormGroup
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      details: ['', Validators.required],
    });
  }

  // คำนวณราคาสินค้ารวม
  calculateTotal(): number {
    return this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  onSubmit() {}
  back() {
    this.router.navigate(['cart']);
  }
}
