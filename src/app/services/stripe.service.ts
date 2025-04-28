import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private http = inject(HttpClient);
  private baseUrl = 'https://angular-ecommerce-1-backend.vercel.app';

  createCheckoutSeesion(orderData: any) {
    return this.http.post<{ sessionId: string; sessionUrl: string }>(
      `${this.baseUrl}/payment/create-payment-intent`,
      orderData
    );
  }
}
