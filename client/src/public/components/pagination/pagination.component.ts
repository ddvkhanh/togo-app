import { Component, OnInit } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  totalPages = 0;
  selectedPageIndex: number = 0;
  totalItems = 0;
  hasPagination: boolean = true;
  constructor(private paginationService: PaginationService) {}

  ngOnInit(): void {
    this.paginationService.totalPages$.subscribe((totalPages) => {
      this.totalPages = totalPages;
    });

    this.paginationService.selectedPage$.subscribe((selectedPage) => {
      this.selectedPageIndex = selectedPage;
    });
  }
  selectPage(pageIndex: number): void {
    this.paginationService.setSelectedPage(pageIndex);
    this.selectedPageIndex = pageIndex;
  }

  pageCounter(arrayLength: number): Array<number> {
    return new Array(arrayLength);
  }
}
