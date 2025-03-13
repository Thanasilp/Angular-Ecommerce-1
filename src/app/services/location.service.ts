import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  // สร้าง signal สำหรับเก็บ address
  deliveryAddress = signal<string | null>(null);
  deliveryLocation = signal<object | null>(null);

  constructor() {}

  async getAddress(lat: number, lng: number): Promise<void> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log('this is data from locationService', data);

      if (data && data.display_name) {
        // อัปเดตค่าที่อยู่ใน signal โดยหลังจากนี้ deliveryAddress จะมีค่าเป็น data.display_name เพราะถูกเซ็ตค่าไปแล้ว
        this.deliveryAddress.set(data.display_name);
        this.deliveryLocation.set({ lat: data.lat, lng: data.lon });
        // console.log(this.deliveryLocation());
      } else {
        this.deliveryAddress.set('ไม่พบที่อยู่');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      this.deliveryAddress.set('เกิดข้อผิดพลาดในการดึงที่อยู่');
    }
  }
}
