import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TogoService } from 'src/public/common/service/togo.service';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  placeDescriptions = [];
  newSearchEvent = new BehaviorSubject<string>(null);
  isCollapsed: boolean = false;
  searchText = null;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.placeDescriptionsChanged.subscribe(
      (desc) => (this.placeDescriptions = desc)
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
