import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  placeDescriptions = [];
  newSearchEvent = new BehaviorSubject<string>(null);
  isCollapsed: boolean = true;
  searchText = null;
  resultText: string;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.placeDescriptionsChanged.subscribe(
      (desc) => (this.placeDescriptions = desc)
    );
    this.menuService.searchResultChanged.subscribe(
      (keyword) => (this.resultText = keyword)
    );
  }

  onSearchButtonClick() {
    this.menuService.search(this.searchText);
  }

  onSuggestionClick(keyword: string) {
    this.menuService.getPlaceDetail(keyword);
  }

  onClearInput() {
    this.menuService.clearSearch();
  }
}
