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
  selectedPage: number = 0;
  totalPages: number = 0;
  places: TogoPlace[] = [];
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

      //pagination
      this.totalPages = this.togoService.getTotalPages();
      this.paginationService.setTotalPages(this.totalPages);
      this.paginationService.setSelectedPage(this.selectedPage);

      //menu search
      console.log(this.togoService.getPlaceDescriptions());

      this.menuService.setPlaceDescriptions(
        this.togoService.getPlaceDescriptions()
      );
    });

    this.togoService.placesChanged.subscribe((places: TogoPlace[]) => {
      this.places = places;
    });

    this.paginationService.selectedPage$.subscribe((selectedPage) => {
      this.selectedPage = selectedPage;
    });
  }

  getPlaceDescriptions(): any[] {
    return this.togoService.getPlaceDescriptions();
  }

  getCategories(places: TogoPlace[]): String[] {
    return this.togoService.getCategories(places);
  }

  onSearchFilter(filterKeyword: string): void {
    if (filterKeyword) {
      this.searchText = filterKeyword;
    } else {
      this.searchText = null;
    }
  }

  // getTotalPages(): number {
  //   return this.togoService.getTotalPages();
  // }

  // selectPage(selectedPage: number): void {
  //   this.selectedPage = selectedPage;
  // }

  ngOnDestroy() {
    // unsubscribe from all subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
