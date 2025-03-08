import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (!token || authService.isTokenExpired()) {
    authService.logout(); // ล้าง token
    router.navigate(['login']);
    return false; // ไม่ให้เข้า route นี้
  }
  return true; //อนุญาตให้เข้า
};
