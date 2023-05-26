import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  newSearchEvent = new BehaviorSubject<string>(null);
  placeDescriptionsChanged = new BehaviorSubject<Array<String>>([]);
  placeDescriptions = [];
  searchText: string;
  isKeywordFound: boolean;

  setPlaceDescriptions(descriptions: Array<string>) {
    this.placeDescriptions = descriptions;
    this.placeDescriptionsChanged.next(this.placeDescriptions);
  }

  getPlaceDescriptions() {
    return this.placeDescriptions;
  }

  search(keyword: string) {
    this.searchText = keyword;
    this.newSearchEvent.next(this.searchText);
  }

  getPlaceDetail(keyword: string) {
    (<HTMLInputElement>document.getElementById('search-input')).value = keyword;
    this.searchText = keyword;
    this.newSearchEvent.next(this.searchText);
  }

  clearSearch() {
    if (
      (<HTMLInputElement>document.getElementById('search-input')).value
        .length == 0
    ) {
      this.searchText = null;
      this.newSearchEvent.next(null);
    }
  }
}
