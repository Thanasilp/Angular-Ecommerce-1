import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  // สร้าง signal สำหรับเก็บ address
  deliveryAddress = signal<string | null>(null);
  deliveryLocation = signal<{ lat: number; lng: number } | null>(null);

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
        //parseFloat เพื่อให้แน่ใจว่าค่าที่เข้ามาเป็นทศนิยม
        this.deliveryLocation.set({
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lon),
        });
        // console.log(this.deliveryLocation());
      } else {
        this.deliveryAddress.set('ไม่พบที่อยู่');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      this.deliveryAddress.set('เกิดข้อผิดพลาดในการดึงที่อยู่');
    }
  }

  // setLocation(lat: number, lng: number) {
  //   const newLocation = { lat, lng };
  //   this.deliveryLocation.set(newLocation);
  //   localStorage.setItem('deliveryLocation', JSON.stringify(newLocation));
  // }

  // private getSavedLocation(): { lat: number; lng: number } | null {
  //   const saved = localStorage.getItem('deliveryLocation');
  //   if (!saved) {
  //     return null;
  //   }

  //   try {
  //     const parsed = JSON.parse(saved);
  //     if (
  //       parsed &&
  //       typeof parsed.lat === 'number' &&
  //       typeof parsed.lng === 'number'
  //     ) {
  //       return parsed;
  //     }
  //   } catch (error) {
  //     console.warn('Invalid location data in localStorage');
  //   }
  //   return null;
  // }

  clearSavedLocation() {
    localStorage.removeItem('deliveryLocation');
    this.deliveryLocation.set(null);
  }
}
