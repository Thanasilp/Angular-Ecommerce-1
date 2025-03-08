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
  private baseUrl = 'http://localhost:4000';
  private token = signal(localStorage.getItem('token') || ''); // เก็บ token

  //การใช้ !! เป็นการแปลงค่า this.token() ให้เป็น Boolean:
  //ถ้า this.token() มีค่าเป็น undefined, null, หรือค่าอื่นๆ ที่ถือว่า "falsy" (เช่น '', 0, false), !! จะทำให้ค่าเป็น false
  //ถ้า this.token() มีค่าเป็น string ที่ไม่ว่างเปล่า (เช่น JWT token ที่ถูกเก็บใน localStorage), !! จะทำให้ค่าเป็น true

  isAuthenticated = computed(() => !!this.token()); // คำนวณว่าผู้ใช้ล็อกอินหรือไม่

  //ผลลัพธ์ที่ได้จาก !!this.token() คือ:
  //true: ถ้าผู้ใช้ล็อกอินแล้วและมี token ที่ถูกเก็บอยู่ใน signal
  //false: ถ้าผู้ใช้ไม่ได้ล็อกอิน หรือไม่มี token อยู่ใน signal

  getToken(): string {
    return this.token(); // เพิ่ม getter เพื่อให้สามารถเข้าถึง token ได้
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

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return true;
    }

    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    const expiry = payload.exp * 1000; // แปลงเป็น miliseconds
    return Date.now() > expiry; // ถ้าเวลาปัจจุบันมากกว่า expiry ถือว่าหมดอายุ
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(''); // รีเซ็ต signal
  }

  // ไม่ได้ใช้ constructor แล้ว เพราะเราใช่้การ inject แทน
  // constructor() {}
}
