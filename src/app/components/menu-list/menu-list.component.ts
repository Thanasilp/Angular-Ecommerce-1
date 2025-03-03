import { Component, inject, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../interfaces/Menu-items';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-menu-list',
  imports: [CommonModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss',
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
export class MenuListComponent {
  @Input() menuItems: MenuItem[] = [];

  // menuItems: MenuItem[] = []; //ข้อมูลเมนูทั้งหมด
  // displayedItems: MenuItem[] = []; //ข้มูลที่แสดงในแต่ละหน้า

  // //Pagination
  // currentPage: number = 1;
  // itemsPerPage: number = 6;

  // private menuService = inject(MenuService);

  // ngOnInit(): void {
  //   this.menuItems = this.menuService.getMenuItems();
  //   this.updateDisplayedItems(); // เริ่มต้นแสดงเมนูจากหน้าแรก
  // }

  // // ฟังก์ชันสำหรับแบ่งข้อมูลเมนู
  // updateDisplayedItems() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   this.displayedItems = this.menuItems.slice(startIndex, endIndex);
  // }

  // // ฟังก์ชันสำหรับเปลี่ยนหน้า
  // changePage(page: number) {
  //   if (page > 0 && page <= this.getTotalPages()) {
  //     this.currentPage = page;
  //     this.updateDisplayedItems();
  //   }
  // }

  // // ฟังก์ชันสำหรับคำนวณจำนวนหน้าทั้งหมด
  // getTotalPages(): number {
  //   return Math.ceil(this.menuItems.length / this.itemsPerPage);
  // }
}
