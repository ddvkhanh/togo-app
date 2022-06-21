import { Injectable } from '@angular/core';
import { TogoPlace } from 'src/public/models/togo.model';
import { DataSource } from './datasource.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TogoService {
  private places: TogoPlace[] = [];
  private locator = (p: TogoPlace, id: any) => p._id === id;
  constructor(private dataSource: DataSource, private router: Router) {}

  ngOnInit() {
    this.get();
  }

  get() {
    this.dataSource.get().subscribe(
      (data) => {
        this.places = data;
      },
      (err) => console.log(err)
    );
  }

  deletePlace(id: string) {
    this.dataSource.deletePlace(id).subscribe(
      () => {
        let index = this.places.findIndex((p) => this.locator(p, id));
        if (index > -1) {
          this.places.splice(index, 1);
        }
      },

      (error) => {
        alert('Error: Cannot delete');
        throw 'Error in deleting place: ' + error;
      }
    );
  }

  savePlace(place: TogoPlace) {
    if (this.places.some((p) => p.name === place.name)) {
      alert('This place already exitst!');
    } else {
      this.dataSource.savePlace(place).subscribe(
        (p) => {
          this.places.push(p);
          alert('Create successfully');
        },
        (error) => {
          alert('Error: Cannot submit form');
          throw 'Error in saving place: ' + error;
        }
      );
    }
  }

  updatePlace(id: string, place: TogoPlace) {
    this.dataSource.updatePlace(id, place).subscribe(
      () => {
        alert('Update successfully');
        this.router.navigateByUrl('/');
      },
      (error) => {
        alert('Error: Cannot submit form');
        throw 'Error in updating place: ' + error;
      }
    );
  }

  getPlaces(): TogoPlace[] {
    return this.places;
  }

  getPlace(id: string) {
    return this.dataSource.getPlace(id);
  }

  cancelChange() {
    if (confirm('Are you sure to cancel?')) {
      this.router.navigateByUrl('/');
    }
  }

  getCategories(places: TogoPlace[]): String[] {
    let categoryArray = places.map((p) => p.category);
    return [...new Set(categoryArray)];
  }
}
