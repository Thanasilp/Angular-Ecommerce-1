import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import {
  ChangeDetectorRef,
  Component,
  computed,
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
  // private cdr = inject(ChangeDetectorRef);

  //ก่อนที่ไม่ได้ใช้ตัวนี้ ปัญหาคือ icon user กดไม่ได้
  // บางครั้ง Angular อาจไม่ detect การเปลี่ยนแปลงของ Signal ได้เร็วพอ ดังนั้นเราสามารถใช้ ChangeDetectorRef เพื่อบังคับให้ Component re-render
  // constructor(private cdr: ChangeDetectorRef) {
  //   effect(() => {
  //     console.log('isLoggedIn changed:', this.isLoggedIn());
  //     this.cdr.detectChanges(); // บังคับให้ Angular อัปเดต View
  //   });
  // }

  // constructor() {
  //   initFlowbite;
  //   console.log(this.isLoggedIn());
  // }

  // ใช้ computed เพื่อให้ฟังก์ชันนี้รีเฟรชตามการเปลี่ยนแปลงของ signal

  isLoggedIn = computed(() => this.authService.isAuthenticated());
  isLoggedIn2 = this.authService.isAuthenticated();

  ngOnInit(): void {
    console.log(this.isLoggedIn());
    console.log(this.isLoggedIn2);

    // this.cdr.detectChanges();
  }

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
