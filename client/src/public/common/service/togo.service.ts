import { Injectable } from '@angular/core';
import { TogoPlace } from 'src/public/models/togo.model';
import { DataSource } from './datasource.service';
import { Router } from '@angular/router';
import { Constants } from 'src/public/app-constants';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TogoService {
  places: TogoPlace[] = [];
  private locator = (p: TogoPlace, id: any) => p._id === id;
  private maxItemPerPage = Constants.MAX_ITEMS_PER_PAGE;
  placesChanged = new BehaviorSubject<TogoPlace[]>([]);
  // selectedPageChanged = new BehaviorSubject<number>(0);
  selectedPage: number;

  constructor(private router: Router, private dataSource: DataSource) {}

  ngOnInit() {}

  fetchPlaces() {
    return this.dataSource.fetchPlaces();
  }

  setPlaces(places: TogoPlace[]): void {
    this.places = places;
  }

  deletePlace(id: string) {
    let index;
    if (confirm('Are you sure to delete this item?')) {
      this.dataSource.deletePlace(id).subscribe({
        next: () => {
          index = this.places.findIndex((p) => this.locator(p, id));
          if (index > -1) {
            this.places.splice(index, 1);
          }
        },
        error: (error) => {
          alert('Error: Cannot delete');
          throw 'Error in deleting place: ' + error;
        },
      });
    }
    this.places.splice(index, 1);
    this.placesChanged.next(this.places.slice());
  }

  savePlace(place: TogoPlace) {
    if (this.places.some((p) => p.name === place.name)) {
      alert('This place already exitst!');
    } else {
      this.dataSource.savePlace(place).subscribe({
        next: (p) => {
          this.places.push(p);
          alert('Create successfully');
        },
        error: (error) => {
          alert('Error: Cannot submit form');
          throw 'Error in saving place: ' + error;
        },
      });
    }
    this.places.push(place);
    this.placesChanged.next(this.places.slice());
  }

  updatePlace(id: string, place: TogoPlace) {
    this.dataSource.updatePlace(id, place).subscribe({
      next: () => {
        alert('Update successfully');
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        alert('Error: Cannot submit form');
        throw 'Error in updating place: ' + error;
      },
    });
    let index = this.places.findIndex((p) => this.locator(p, id));
    this.places[index] = place;
    this.placesChanged.next(this.places.slice());
  }

  getPlaces(): TogoPlace[] {
    return this.places;
  }

  getPlace(id: string) {
    return this.dataSource.getPlace(id);
  }

  getPlaceDescriptions(): any[] {
    let result = [];
    for (let i of this.places) {
      result.push(i.description);
    }
    return result;
  }

  // getSelectedPage(): number {
  //   return this.selectedPage;
  // }

  // selectPage(pageNumber: number) {
  //   this.selectedPage = pageNumber;
  //   this.selectedPageChanged.next(pageNumber);
  // }

  getTotalPages(): number {
    console.log(this.places);
    console.log(
      'total pages: ',
      Math.ceil(this.places.length / this.maxItemPerPage)
    );
    return Math.ceil(this.places.length / this.maxItemPerPage);
  }

  onGoBack() {
    if (confirm('You might lose your unsaved changes')) {
      this.router.navigateByUrl('/');
    }
  }

  getCategories(places: TogoPlace[]): String[] {
    let categoryArray = places.map((p) => p.category);
    return [...new Set(categoryArray)];
  }
}
