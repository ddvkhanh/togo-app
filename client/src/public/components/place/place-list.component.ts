import { Component, OnInit, PipeTransform } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { Constants } from 'src/public/app-constants';
import { TogoService } from 'src/public/common/service/togo.service';
import { TogoPlace } from 'src/public/models/togo.model';
import { PaginationService } from '../pagination/pagination.service';
import { MenuService } from '../menu/menu.service';
import { SearchFilterTablePipe } from 'src/public/common/pipe/searchFilterTable.pipe';
import { CategoryVisitFilterPipe } from 'src/public/common/pipe/categoryVisitFilter.pipe';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  providers: [TogoService],
})
export class PlaceListComponent implements OnInit {
  CATEGORY_ALL: string = Constants.CATEGORY_ALL;
  selectedCategory: string;
  selectedVisitStatus: string;
  isEditing: boolean;
  searchText: string = '';
  selectedPageIndex: number = 0;
  totalPages: number = 0;
  places: TogoPlace[] = [];
  visiblePlacesPerPage: TogoPlace[] = this.places.slice(0, 10);
  placeDescriptions: string[];
  private subscriptions: Subscription[] = [];

  constructor(
    private togoService: TogoService,
    private paginationService: PaginationService,
    private menuService: MenuService,
    private searchFilterPipe: SearchFilterTablePipe,
    private categoryVisitFilterPipe: CategoryVisitFilterPipe
  ) {}

  ngOnInit() {
    this.togoService.fetchPlaces().subscribe((places) => {
      this.togoService.setPlaces(places);
      this.menuService.setPlaceDescriptions(this.placeDescriptions);
    });

    this.togoService.placesChanged.subscribe((places: TogoPlace[]) => {
      this.places = places;
      this.updatePlaceDescriptionsAndPagination();
    });

    this.paginationService.selectedPage$.subscribe((selectedPage) => {
      this.selectedPageIndex = selectedPage;
      this.onPageChange(this.selectedPageIndex);
    });

    this.menuService.newSearchEvent.subscribe((keyword) => {
      this.onSearch(keyword);
    });
  }

  private updatePlaceDescriptionsAndPagination() {
    this.placeDescriptions = this.getPlaceDescriptions();
    this.paginationService.setTotalItems(this.placeDescriptions.length);
    this.onPageChange(this.selectedPageIndex);
  }

  getPlaceDescriptions(): any[] {
    return this.togoService.getPlaceDescriptions();
  }

  getCategories(places: TogoPlace[]): String[] {
    return this.togoService.getCategories(places);
  }

  recalculatePagination(itemsCount: number) {
    this.paginationService.setTotalItems(itemsCount);
    this.selectedPageIndex = 0;
    this.paginationService.setSelectedPage(this.selectedPageIndex);
  }

  onPageChange(page: number) {
    this.selectedPageIndex = page;
  }

  onSearch(filterKeyword: string): void {
    if (filterKeyword) {
      this.searchText = filterKeyword;
      const filteredItems = this.searchFilterPipe.transform(
        this.places,
        this.searchText
      );
      this.recalculatePagination(filteredItems.length);
    } else {
      this.searchText = null;
      this.recalculatePagination(this.places.length);
    }
  }

  onFilterChange(selectedCategory: string, visitStatus: string) {
    const filteredItems = this.categoryVisitFilterPipe.transform(
      this.places,
      selectedCategory,
      visitStatus
    );
    this.recalculatePagination(filteredItems.length);
  }

  getPipeResults(pipeName: PipeTransform, filter: string): TogoPlace[] {
    return pipeName.transform(this.places, filter);
  }
  ngOnDestroy() {
    // unsubscribe from all subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
