import {
  Component,
  EventEmitter,
  Output,
  AfterViewInit,
  inject,
} from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Output() locationSelected = new EventEmitter<{
    lat: number;
    lng: number;
    address: string;
  }>();

  private map!: L.Map;
  private marker!: L.Marker;
  private locationService = inject(LocationService);

  lat = 19.918;
  lng = 99.826;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          this.map = L.map('map').setView([this.lat, this.lng], 13);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
          }).addTo(this.map);

          this.marker = L.marker([this.lat, this.lng], {
            draggable: true,
          }).addTo(this.map);

          // เรียกใช้ LocationService เพื่อตั้งค่า address
          this.locationService.getAddress(this.lat, this.lng);

          this.marker.on('dragend', () => {
            const position = this.marker.getLatLng();
            this.lat = position.lat;
            this.lng = position.lng;
            this.locationService.getAddress(this.lat, this.lng);
          });
        },
        () => this.fallbackMap()
      );
    } else {
      this.fallbackMap();
    }
  }

  private fallbackMap(): void {
    this.map = L.map('map').setView([this.lat, this.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.marker = L.marker([this.lat, this.lng], { draggable: true }).addTo(
      this.map
    );

    this.locationService.getAddress(this.lat, this.lng);

    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      this.lat = position.lat;
      this.lng = position.lng;
      this.locationService.getAddress(this.lat, this.lng);
    });
  }
}
