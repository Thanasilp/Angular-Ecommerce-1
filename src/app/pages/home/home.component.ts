import { Component, inject, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../interfaces/Menu-items';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  private menuService = inject(MenuService);

  menuItems: MenuItem[] = [];
  displayedItems: MenuItem[] = [];

  //pagination
  currentPage: number = 1;
  itemsPerPage: number = 3;

  //Banner
  bannerStyles = [
    {
      backgroundColor: 'bg-black',
      title: 'Welcome to Our Coffee Shop!',
      description: 'Premium coffee blends for every taste',
    },
    {
      backgroundColor: 'bg-zinc-800',
      title: 'Start Your Day Right!',
      description: 'Freshly brewed coffee to energize you',
    },
    {
      backgroundColor: 'bg-teal-950',
      title: 'Experience the Best Coffee',
      description: 'Taste the finest coffee beans from around the world',
    },
  ];

  // ตัวแปรที่ใช้เก็บค่าที่เลือกจาก array
  selectedBannerStyle: any;

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuItems(); //ตอนโลหดรูปครั้งแรก
    this.updateDisplayedItems(); //ตอนเปลี่ยน pagnination

    //เลือกรูปแบบสุ่มจาก array
    this.selectedBannerStyle =
      this.bannerStyles[Math.floor(Math.random() * this.bannerStyles.length)];

    setInterval(() => {
      this.setRandomBannerStyle(); // เปลี่ยนรูปแบบทุกๆ 5 วินาที
    }, 3000);
  }

  // ฟังก์ชันสุ่มเลือกรูปแบบ
  setRandomBannerStyle() {
    this.selectedBannerStyle =
      this.bannerStyles[Math.floor(Math.random() * this.bannerStyles.length)];
  }

  // ฟังก์ชันสำหรับแบ่งข้อมูลเมนู
  updateDisplayedItems() {
    const starIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = starIndex + this.itemsPerPage;
    this.displayedItems = this.menuItems.slice(starIndex, endIndex);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updateDisplayedItems();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.menuItems.length / this.itemsPerPage);
  }
}
