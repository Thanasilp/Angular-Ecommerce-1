import { OrderService } from './../../services/order.service';
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
import { ToastrService } from 'ngx-toastr';

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
  private orderService = inject(OrderService);
  private toastr = inject(ToastrService);

  cartItems = this.cartService.cartItems;

  // computed() ถูกใช้เพื่อดึงค่าจาก Signal (deliveryLocation) แต่ในกรณีของ LocationService ค่าอาจถูกเปลี่ยนแปลงจากหลายที่ ทำให้ computed() อาจไม่จำเป็น
  address = computed(() => this.locationService.deliveryAddress()); // เก็บค่า address ที่แปลงจาก lat/lng จาก map component อีกที
  location = computed(() => this.locationService.deliveryLocation()); // เก็บค่า lat/lng

  // get address() {
  //   return this.locationService.deliveryAddress();
  // }

  // get location() {
  //   return this.locationService.deliveryLocation();
  // }

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
          // console.log('this is res.address', res.address);

          this.deliveryForm.patchValue(res.address);

          // ดึงข้อมูลมาแล้ว เราต้องอัปเดตข้อมูล lat/lng กลับไปให้ service ไปอัปเดตตำแหน่งหมุดใน component map ด้วย
          if (res.address.lat && res.address.lng) {
            const newLocation = { lat: res.address.lat, lng: res.address.lng };
            this.locationService.deliveryLocation.set(newLocation);
            // localStorage.setItem(
            //   'deliveryLocation',
            //   JSON.stringify(newLocation)
            // );
          }
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
    const totalAmount = this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return totalAmount;
  }

  // โหลดที่อยู่ของ user ผ่าน AddressService

  addressSaved = false;

  onSaveAddress() {
    if (this.deliveryForm.invalid) {
      return;
    }

    const location = this.location() as { lat: number; lng: number };
    if (location?.lat && location?.lng) {
      const addressData = { ...this.deliveryForm.value, ...location };

      this.addressService.updateUserAddress(addressData).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success('Address confirm!');
            console.log('Address updated successfully!');
            this.addressSaved = true;
          }
        },
        error: (error) => console.error('Error updating address:', error),
      });
    }

    console.error('Invalid location data');
  }

  onSubmit() {
    if (this.cartItems().length === 0) {
      console.error('Cart is empty');
      return;
    }

    const orderData = {
      items: this.cartItems(),
      totalAmount: this.calculateTotal(),
      deliveryAddress: this.deliveryForm.value,
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (res) => {
        console.log('Order placed successfully', res);
        this.cartService.clearCart();
        this.locationService.clearSavedLocation();
        this.router.navigate(['home']);
      },
      error: (err) => console.error('Order creation failed:', err),
    });
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
