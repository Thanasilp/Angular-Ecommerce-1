import { Component, EventEmitter, Output, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() filterChange = new EventEmitter<{
    searchTerm: string;
    selectedPrice: string;
    selectedCoffeeType: string;
  }>();

  searchTerm: string = '';
  selectedPrice: string = 'low-to-high';
  selectedCoffeeType: string = '';

  onFilterChange() {
    this.filterChange.emit({
      searchTerm: this.searchTerm,
      selectedPrice: this.selectedPrice,
      selectedCoffeeType: this.selectedCoffeeType,
    });
  }
  // toggleSidebar() {
  //   this.isOpen.update((value) => !value);
  // }
}
