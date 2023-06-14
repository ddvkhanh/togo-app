import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from 'src/public/app-constants';
import { TogoPlace } from 'src/public/models/togo.model';

@Pipe({
  name: 'category',
  pure: false,
})
export class CategoryVisitFilterPipe implements PipeTransform {
  CATEGORY_ALL: string = Constants.CATEGORY_ALL;
  VISITED: string = Constants.VISITED;
  NOT_VISITED: string = Constants.NOT_VISITED;

  transform(
    places: TogoPlace[],
    selectedCategory: string,
    selectedStatus: string
  ): TogoPlace[] {
    let placesInCategory: TogoPlace[];
    placesInCategory =
      selectedCategory == undefined || selectedCategory == this.CATEGORY_ALL
        ? places
        : places.filter((p) => p.category == selectedCategory);

    if (selectedStatus == 'done') {
      return placesInCategory.filter((p) => p.isVisited == true);
    } else if (selectedStatus == 'active') {
      return placesInCategory.filter((p) => p.isVisited == false);
    } else {
      return placesInCategory;
    }
  }
}
