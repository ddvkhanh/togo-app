import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private totalPagesSource = new BehaviorSubject<number>(1);
  private selectedPageSource = new BehaviorSubject<number>(0);
  itemsPerPage: number;

  totalPages$ = this.totalPagesSource.asObservable();
  selectedPage$ = this.selectedPageSource.asObservable();

  setTotalPages(totalPages: number) {
    this.totalPagesSource.next(totalPages);
  }

  setSelectedPage(selectedPage: number) {
    this.selectedPageSource.next(selectedPage);
  }

  getItemsPerPage(itemsCountPerPage: number) {
    this.itemsPerPage = itemsCountPerPage;
  }
}
