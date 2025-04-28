import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private http = inject(HttpClient);
  private baseUrl = 'https://angular-ecommerce-1-backend.vercel.app';

  // ดึงข้อมูลที่อยู่ของผู้ใช้
  getUserAddress(): Observable<{ success: boolean; address: any }> {
    return this.http.get<{ success: boolean; address: any }>(
      `${this.baseUrl}/user/address`
    );
  }

  // บันทึก/อัปเดตข้อมูลผู้ใช้
  updateUserAddress(
    addressData: any
  ): Observable<{ success: boolean; message: string }> {
    // console.log('This is address data from address service', addressData);
    return this.http.put<{ success: boolean; message: string }>(
      `${this.baseUrl}/user/address`,
      addressData
    );
  }
}
