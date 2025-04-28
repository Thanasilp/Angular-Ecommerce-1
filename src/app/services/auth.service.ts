import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { RegisterData } from '../interfaces/register-data';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // api part
  private http = inject(HttpClient);
  private baseUrl = 'https://angular-ecommerce-1-backend.vercel.app/';
  private token = signal(localStorage.getItem('token') || ''); // เก็บ token

  constructor() {
    if (this.isTokenExpired()) {
      this.logout(); // ออกจากระบบถ้า token หมดอายุ
    }
  }

  //การใช้ !! เป็นการแปลงค่า this.token() ให้เป็น Boolean:
  //ถ้า this.token() มีค่าเป็น undefined, null, หรือค่าอื่นๆ ที่ถือว่า "falsy" (เช่น '', 0, false), !! จะทำให้ค่าเป็น false
  //ถ้า this.token() มีค่าเป็น string ที่ไม่ว่างเปล่า (เช่น JWT token ที่ถูกเก็บใน localStorage), !! จะทำให้ค่าเป็น true

  isAuthenticated = computed(() => !!this.token()); // คำนวณว่าผู้ใช้ล็อกอินหรือไม่

  address = signal<object | null>(null);
  //ผลลัพธ์ที่ได้จาก !!this.token() คือ:
  //true: ถ้าผู้ใช้ล็อกอินแล้วและมี token ที่ถูกเก็บอยู่ใน signal
  //false: ถ้าผู้ใช้ไม่ได้ล็อกอิน หรือไม่มี token อยู่ใน signal

  getToken(): string {
    return this.token(); // เพิ่ม getter เพื่อให้สามารถเข้าถึง token ได้
  }

  getUserId(): string | null {
    const token = this.token();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.id : null;
    }
    return null;
  }

  registerUser(registerData: RegisterData): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, registerData);
  }

  loginUser(email: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/user/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.token.set(response.token); // อัปเดต signal
        })
      );
  }

  updateUserAddress(addressData: {
    name: string;
    displayedAddress: string;
    lat: number;
    lng: number;
    phone: string;
    details: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.baseUrl}/user/address`,
      addressData
    );
  }

  // getUserAddress(): Observable<any> {
  //   const token = this.token();
  //   if (token) {
  //     const decodedToken = this.decodeToken(token);
  //     const userId = decodedToken?.id;
  //     if (userId) {
  //       return this.http.get(`${this.baseUrl}/user/${userId}/address`);
  //     }
  //   }
  //   return null;
  // }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1]; // ดึง payload จาก JWT
      const decoded = this.decodeBase64Unicode(payload);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  private decodeBase64Unicode(base64: string): string {
    const binaryString = atob(base64); // Decode Base64 to binary string
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes); // Decode to UTF-8 string
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return true;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      // ตรวจสอบว่า token มี 3 ส่วน
      return true;
    }

    try {
      // const payload = JSON.parse(atob(parts[1])); // Decode JWT
      const payload = JSON.parse(this.decodeBase64Unicode(parts[1]));
      if (!payload.exp) {
        // ตรวจสอบว่า exp มีค่าหรือไม่
        return true;
      }

      const expiry = payload.exp * 1000; // แปลงเป็น milliseconds
      return Date.now() > expiry;
    } catch (error) {
      return true; // ถ้า decode ไม่ได้ ถือว่าหมดอายุ
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(''); // รีเซ็ต signal
  }

  // ไม่ได้ใช้ constructor แล้ว เพราะเราใช่้การ inject แทน
  // constructor() {}
}
