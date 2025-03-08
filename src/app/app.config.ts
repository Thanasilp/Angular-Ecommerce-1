import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideToastr({
      positionClass: 'toast-top-right', // ตำแหน่งการแสดงผล
      timeOut: 1500, // เวลาที่ Toast จะแสดง
      progressBar: true, // แสดง progress bar
      closeButton: true, // ปุ่มปิด
      preventDuplicates: true,
    }),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
