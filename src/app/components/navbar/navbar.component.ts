import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public authService = inject(AuthService);
  private router = inject(Router);

  //ก่อนที่ไม่ได้ใช้ตัวนี้ ปัญหาคือ icon user กดไม่ได้
  // บางครั้ง Angular อาจไม่ detect การเปลี่ยนแปลงของ Signal ได้เร็วพอ ดังนั้นเราสามารถใช้ ChangeDetectorRef เพื่อบังคับให้ Component re-render
  // constructor(private cdr: ChangeDetectorRef) {
  //   effect(() => {
  //     console.log('isLoggedIn changed:', this.isLoggedIn());
  //     this.cdr.detectChanges(); // บังคับให้ Angular อัปเดต View
  //   });
  // }

  ngOnInit(): void {
    console.log('check');
  }

  // ใช้ computed เพื่อให้ฟังก์ชันนี้รีเฟรชตามการเปลี่ยนแปลงของ signal
  isLoggedIn = computed(() => this.authService.isAuthenticated());

  // isLoggedIn() {
  //   return true;
  // }

  // isLoggedIn = computed(() => {
  //   setTimeout(() => {
  //     this.authService.isAuthenticated();
  //   }, 1000);
  // }); // ใช้ signal

  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }
}
