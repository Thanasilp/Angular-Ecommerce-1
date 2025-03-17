import { Component, computed, effect, inject, OnInit } from '@angular/core';
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
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-address',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MapComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  private cartService = inject(CartService);
  private addressService = inject(AddressService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private locationService = inject(LocationService);

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

    this.addressService.getUserAddress().subscribe({
      next: (res) => {
        if (res.success && res.address) {
          console.log('this is res.address', res.address);

          this.deliveryForm.patchValue(res.address);
        }
      },
      error: (error) => console.error('Error fetching address', error),
      complete: () => console.log('Fetch address completed.'),
    });

    // version นี้ depricate ไปแล้ว ต้องใช้แบบ object แทน
    // this.addressService.getUserAddress().subscribe(
    //   (res) => {
    //     if (res.success && res.address) {
    //       this.deliveryForm.patchValue(res.address);
    //     }
    //   },
    //   (error) => console.error('Error fetching address', error)
    // );
  }

  // effect() จะทำงานทันทีที่ Component ถูกโหลด
  updateEffect = effect(() => {
    const newAddress = this.address();
    this.deliveryForm
      .get('address')
      ?.setValue(newAddress, { emitEvent: false });
    //เอาสองตัวนี้อัปเดตตามฟอร์ม
    console.log(this.address());
    console.log(this.location());
  });

  // คำนวณราคาสินค้ารวม
  calculateTotal(): number {
    return this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // โหลดที่อยู่ของ user ผ่าน AddressService

  onSubmit() {
    if (this.deliveryForm.invalid) {
      return;
    }

    // ใช้ Type Assertion แปลง object ให้เป็นประเภทที่มี lat และ lng
    const location = this.location() as { lat: number; lng: number }; // Type Assertion
    if (location && location.lat && location.lng) {
      const addressData = {
        ...this.deliveryForm.value,
        lat: location.lat,
        lng: location.lng,
      };

      this.addressService.updateUserAddress(addressData).subscribe({
        next: (res) => {
          if (res.success) {
            console.log('Address updated successfully!');
          }
        },
        error: (error) => console.error('Error updating address:', error),
      });
    } else {
      console.error('Location is invalid or missing lat/lng');
    }
  }

  // (res) => {
  //   if (res.success) {
  //     console.log('Address updated successfully!');
  //   }
  // },
  // (err) => console.error('Error updating address:', err)

  // this.addressService.getUserAddress().subscribe({
  //   next: (res) => {
  //     if (res.success && res.address) {
  //       console.log('this is res.address', res.address);

  //       this.deliveryForm.patchValue(res.address);
  //     }
  //   },
  //   error: (error) => console.error('Error fetching address', error),
  //   complete: () => console.log('Fetch address completed.'),
  // });

  back() {
    this.router.navigate(['cart']);
  }
}
