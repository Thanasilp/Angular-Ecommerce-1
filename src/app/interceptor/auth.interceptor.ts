import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject AuthService และ Router เข้ามาใช้ในฟังก์ชัน
  const authServer = inject(AuthService);

  // ดึง token จาก AuthService หรือจาก localStorage
  const token = authServer.getToken();

  // ถ้ามี token ให้คัดลอก request และเพิ่ม Authorization header
  const clonedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  // ส่งคำขอที่ถูกดัดแปลงหรือเดิมไปยังขั้นตอนถัดไป
  return next(clonedReq); // ใช้ clonedReq ที่แก้ไขแล้ว
};
