import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { Constants } from 'src/public/app-constants';
import { TogoService } from 'src/public/common/service/togo.service';
import { TogoPlace } from 'src/public/models/togo.model';
import { PaginationService } from '../pagination/pagination.service';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  providers: [TogoService],
})
export class PlaceListComponent implements OnInit {
  maxItemPerPage: number = Constants.MAX_ITEMS_PER_PAGE;
  selectedCategory: string;
  selectedVisitStatus: string;
  isEditing: boolean;
  searchText: string = '';
  totalItems: number = 0;
  selectedPageIndex: number = 0;
  totalPages: number = 0;
  places: TogoPlace[] = [];
  visiblePlacesPerPage: TogoPlace[] = this.places.slice(0, 10);
  placeDescriptions: string[];
  private subscriptions: Subscription[] = [];

  constructor(
    private togoService: TogoService,
    private paginationService: PaginationService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.togoService.fetchPlaces().subscribe((places) => {
      this.places = places;
      this.togoService.setPlaces(places);
      this.updatePlaceDescriptionsAndPagination();
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
      this.onSearchFilter(keyword);
    });
  }

  private updatePlaceDescriptionsAndPagination() {
    this.placeDescriptions = this.getPlaceDescriptions();
    this.totalItems = this.placeDescriptions.length;
    this.paginationService.setTotalItems(this.totalItems);
    this.onPageChange(this.selectedPageIndex);
  }

  getPlaceDescriptions(): any[] {
    return this.togoService.getPlaceDescriptions();
  }

  getCategories(places: TogoPlace[]): String[] {
    return this.togoService.getCategories(places);
  }

  onSearchFilter(filterKeyword: string): void {
    this.searchText = filterKeyword;
    if (filterKeyword) {
      // this.totalItems = (this.placeDescriptions || []).filter((p) =>
      //   p.includes(this.searchText)
      // ).length;
      // this.paginationService.setTotalItems(this.totalItems);
      // this.selectedPageIndex = 0;
      // this.paginationService.setSelectedPage(this.selectedPageIndex);

      this.paginationService.setPaginationDisplay(false);
      this.visiblePlacesPerPage = this.paginationService.calculateVisibleItems(
        -1,
        this.places
      );
    } else {
      this.paginationService.setPaginationDisplay(true);
      this.onPageChange(this.selectedPageIndex);
    }
  }

  onPageChange(page: number) {
    this.selectedPageIndex = page;
    this.visiblePlacesPerPage = this.paginationService.calculateVisibleItems(
      this.selectedPageIndex,
      this.places
    );
  }

  ngOnDestroy() {
    // unsubscribe from all subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
