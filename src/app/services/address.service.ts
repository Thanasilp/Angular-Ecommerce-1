import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:4000';

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
    return this.http.put<{ success: boolean; message: string }>(
      `${this.baseUrl}/user/address`,
      addressData
    );
  }
}
