import { MenuService } from './../../services/menu.service';
import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MenuListComponent } from '../../components/menu-list/menu-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem } from '../../interfaces/Menu-items';

@Component({
  selector: 'app-menu',
  imports: [SidebarComponent, MenuListComponent, CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  filteredMenuItems: MenuItem[] = [];

  private menuService = inject(MenuService);

  // 1. ดึงข้อมูลเมนูจาก Service ผ่าน Signal
  menuItems = computed(() => this.menuService.products());

  constructor() {
    // 2. ใช้ effect() เพื่อให้ updated เมนูทุกครั้งที่ signal เปลี่ยนแปลง
    effect(() => {
      this.updateDisplayedItems();
    });
  }

  ngOnInit(): void {
    this.menuService.fetchProducts(); // 2. ดึงข้อมูลจาก backend
    // 3. ตั้งค่า filteredMenuItems ใหม่เมื่อข้อมูลจาก Signal อัพเดต

    // this.filteredMenuItems = [...this.menuItems()]; // 3. เริ่มต้นให้ filteredMenuItems มีค่าจาก menuItems
  }

  // ฟังก์ชันนี้จะทำการอัปเดต filteredMenuItems เมื่อ menuItems() เปลี่ยนแปลง
  updateDisplayedItems() {
    this.filteredMenuItems = [...this.menuItems()];
  }

  // ฟังก์ชันกรองเมนูที่ได้รับจาก Sidebar
  filterMenu(
    searchTerm: string,
    selectedPrice: string,
    selectedCoffeeType: string
  ) {
    // 4.ดึงค่าล่าสุดของเมนูจาก Signal
    const items: MenuItem[] = this.menuItems();

    this.filteredMenuItems = items.filter((coffee: MenuItem) => {
      return (
        (searchTerm
          ? coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true) &&
        (selectedPrice === 'low-to-high'
          ? coffee.price >= 0
          : selectedPrice === 'high-to-low'
          ? coffee.price <= 1000
          : true) &&
        (selectedCoffeeType
          ? coffee.category.toLowerCase() === selectedCoffeeType.toLowerCase()
          : true)
      );
    });

    // จัดเรียงเมนูตามราคาหากเลือก 'low-to-high' หรือ 'high-to-low'
    if (selectedPrice === 'low-to-high') {
      this.filteredMenuItems.sort((a, b) => a.price - b.price); // เรียงจากราคาต่ำไปสูง
    } else if (selectedPrice === 'high-to-low') {
      this.filteredMenuItems.sort((a, b) => b.price - a.price); // เรียงจากราคาสูงไปต่ำ
    }
  }
}
