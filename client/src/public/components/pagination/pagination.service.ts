import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Constants } from 'src/public/app-constants';
import { TogoPlace } from 'src/public/models/togo.model';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private selectedPageSource = new BehaviorSubject<number>(1);
  private totalPagesSource = new BehaviorSubject<number>(0);
  private showPagination = new BehaviorSubject<boolean>(true);

  itemsPerPage: number;
  totalItems: number;
  private maxItemPerPage = Constants.MAX_ITEMS_PER_PAGE;

  totalPages$ = this.totalPagesSource.asObservable();
  selectedPage$ = this.selectedPageSource.asObservable();
  showPagination$ = this.showPagination.asObservable();

  setTotalItems(totalItems: number) {
    this.totalItems = totalItems;
    this.setTotalPages(this.getTotalPages());
  }

  setTotalPages(totalPages: number) {
    this.totalPagesSource.next(totalPages);
  }

  setSelectedPage(selectedPage: number) {
    this.selectedPageSource.next(selectedPage);
  }

  setItemsPerPage(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
  }

  getItemsPerPage(itemsCountPerPage: number) {
    this.itemsPerPage = itemsCountPerPage;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.maxItemPerPage);
  }

  calculateVisibleItems(
    selectedPageIndex: number,
    places: TogoPlace[]
  ): TogoPlace[] {
    if (selectedPageIndex > -1) {
      const startIndex = this.maxItemPerPage * selectedPageIndex;
      const endIndex = startIndex + this.maxItemPerPage - 1;
      console.log('startIndedx ' + startIndex);
      console.log('endIndex ' + endIndex);
      console.log(places.slice(startIndex, endIndex));
      return places.slice(startIndex, endIndex);
    } else {
      return places;
    }
  }

  setPaginationDisplay(hasPagination: boolean) {
    this.showPagination.next(hasPagination);
  }
}
