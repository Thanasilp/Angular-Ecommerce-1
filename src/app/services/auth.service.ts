import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterData } from '../interfaces/register-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:4000';

  registerUser(registerData: RegisterData): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, registerData);
  }

  loginUser(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/user/login`, {
      email,
      password,
    });
  }
  // ไม่ได้ใช้ constructor แล้ว เพราะเราใช่้การ inject แทน
  // constructor() {}
}
