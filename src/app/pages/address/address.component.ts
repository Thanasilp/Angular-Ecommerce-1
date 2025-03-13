import { AuthService } from './../../services/auth.service';
import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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
import { MapComponent } from '../../components/map/map.component';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-address',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MapComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private locationService = inject(LocationService);
  private cdr = inject(ChangeDetectorRef);

  cartItems = this.cartService.cartItems;

  address = computed(() => this.locationService.deliveryAddress()); // เก็บค่า address ที่แปลงจาก lat/lng จาก map component อีกที
  location = computed(() => this.locationService.deliveryLocation()); // เก็บค่า lat/lng

  deliveryForm!: FormGroup; //deliveryForm! บอกว่า deliveryForm จะมีค่าแน่นอน

  constructor() {
    this.cartService.fetchCartItems(); // โหลดข้อมูลตะกร้าเมื่อ component ถูกสร้าง
  }

  ngOnInit(): void {
    // โหลดข้อมูลที่อยู่ของผู้ใช้จาก backend

    //สร้างฟอร์มด้วย FormGroup
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      details: ['', Validators.required],
    });
  }

  // effect() จะทำงานทันทีที่ Component ถูกโหลด
  updateEffect = effect(() => {
    const newAddress = this.address();
    this.deliveryForm
      .get('address')
      ?.setValue(newAddress, { emitEvent: false });
  });

  // คำนวณราคาสินค้ารวม
  calculateTotal(): number {
    return this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  onSubmit() {
    if (this.deliveryForm.invalid) {
      return;
    }

    const userId = this.authService.getUserId();

    const orderData = {};
  }
  back() {
    this.router.navigate(['cart']);
  }
}
