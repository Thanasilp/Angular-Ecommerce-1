import { LocationService } from './../../services/location.service';
import {
  Component,
  EventEmitter,
  Output,
  AfterViewInit,
  inject,
  effect,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private marker!: L.Marker;
  private locationService = inject(LocationService);

  // lat-lng SET 1
  lat = 19.918;
  lng = 99.826;

  ngAfterViewInit(): void {
    this.initMap();
  }

  constructor() {
    //ก่อนห้านี้ใช้การ subscribe ซึ่งใช้ไม่ได้กับ signal ต้องใช้ effect() แทน
    // ใช้ effect() เพื่ออัปเดตตำแหน่งหมุดเมื่อ locationService.deliveryLocation เปลี่ยนแปลง
    effect(() => {
      const location = this.locationService.deliveryLocation();
      if (location && this.map && this.marker) {
        console.log('Updating marker position to:', location);
        this.updateMarkerPosition(location);
        console.log('loop');
      }
    });
  }

  private initMap(): void {
    // เช็คว่ามีพิกัดอยู่ใน LocationService หรือไม่
    const savedLocation = this.locationService.deliveryLocation();

    if (savedLocation) {
      // lat-lng SET 2
      this.lat = savedLocation.lat;
      this.lng = savedLocation.lng;
    }

    // เรียก setupMap() แค่ครั้งเดียวที่นี่
    this.setupMap();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // lat-lng SET 3
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          // อัปเดตค่าลง LocationService

          // อัปเดตหมุด แทนที่จะโหลดแผนที่ใหม่
          this.updateMarkerPosition({ lat: this.lat, lng: this.lng });
          this.locationService.setLocation(this.lat, this.lng);
        },
        () => {
          console.warn('Geolocation failed, using default location.');
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.warn('Geolocation API not supported.');
    }
  }

  private setupMap(): void {
    // ป้องกันการโหลดแมพซ้ำ
    if (this.map) {
      console.warn('Map already initialized: Skipping setup.');
      return;
    }

    this.map = L.map('map').setView([this.lat, this.lng], 13); // set ตรงกลาง map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // set marker
    this.marker = L.marker([this.lat, this.lng], { draggable: true }).addTo(
      this.map
    );

    this.locationService.getAddress(this.lat, this.lng);

    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      // lat-lng SET 4
      this.lat = position.lat;
      this.lng = position.lng;
      // this.locationService.setLocation(this.lat, this.lng);
      this.locationService.getAddress(this.lat, this.lng);
    });
  }

  private updateMarkerPosition(location: { lat: number; lng: number }): void {
    if (this.marker && this.map) {
      // lat-lng SET 5
      this.marker.setLatLng([location.lat, location.lng]);
      this.map.setView([location.lat, location.lng], this.map.getZoom(), {
        animate: true,
      });
    }

    // อัปเดตตำแหน่งหมุด
    // this.marker.setLatLng([location.lat, location.lng]);
    // this.map.setView([location.lat, location.lng], 13);

    // อัปเดตตำแหน่งหมุดบนแผนที่
    // console.log('Updating marker position to:', location);
    // // สมมติว่า marker เป็น instance ของ L.Marker
    // this.marker.setLatLng([location.lat, location.lng]);
  }
}
