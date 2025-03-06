import { inject, Injectable, signal } from '@angular/core';
import { MenuItem } from '../interfaces/Menu-items';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:4000';

  products = signal<MenuItem[]>([]);

  fetchProducts() {
    this.http
      .get<{ success: boolean; products: MenuItem[] }>(
        `${this.baseUrl}/product`
      )
      .subscribe({
        next: (data) => {
          if (data.success) {
            this.products.set(data.products); // update ค่า signal
          }
        },
        error: (error) => console.error('Error fetching products:', error),
      });
  }

  //วิธีนี้ใช้ behaviorSubject แต่เราจะไปใช้วิธี signal แทน
  // getProduct(): Observable<{ success: boolean; products: MenuItem }> {
  //   return this.http.get<{ success: boolean; products: MenuItem }>(
  //     `${this.baseUrl}/product`
  //   );
  // }
}
