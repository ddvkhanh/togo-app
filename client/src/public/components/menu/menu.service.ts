import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  @ViewChild('search') searchInput: ElementRef;
  newSearchEvent = new BehaviorSubject<string>(null);
  placeDescriptionsChanged = new BehaviorSubject<Array<String>>([]);
  searchResultChanged = new BehaviorSubject<string>(null);
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
    this.searchResultChanged.next(keyword); //update the value of search input box value
    this.searchText = keyword;
    this.newSearchEvent.next(this.searchText);
  }

  clearSearch() {
    this.searchText = null;
    this.newSearchEvent.next(null);
  }
}
