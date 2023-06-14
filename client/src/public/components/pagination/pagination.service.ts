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

  itemsPerPage: number;
  totalItems: number;
  private maxItemPerPage = Constants.MAX_ITEMS_PER_PAGE;

  totalPages$ = this.totalPagesSource.asObservable();
  selectedPage$ = this.selectedPageSource.asObservable();

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
}
