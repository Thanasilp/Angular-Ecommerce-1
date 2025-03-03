import { MenuService } from './../../services/menu.service';
import { Component, inject, OnInit } from '@angular/core';
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
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];

  private MenuService = inject(MenuService);

  ngOnInit(): void {
    this.menuItems = this.MenuService.getMenuItems();
    this.filteredMenuItems = [...this.menuItems];
  }

  // ฟังก์ชันหรองเมนูที่ได้รับจาก Sidebar
  filterMenu(
    searchTerm: string,
    selectedPrice: string,
    selectedCoffeeType: string
  ) {
    this.filteredMenuItems = this.menuItems.filter((coffee) => {
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
