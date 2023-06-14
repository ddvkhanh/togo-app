import { Pipe, PipeTransform } from '@angular/core';
import { TogoPlace } from 'src/public/models/togo.model';

@Pipe({ name: 'searchTable' })
export class SearchFilterTablePipe implements PipeTransform {
  transform(places: TogoPlace[], searchText: string): TogoPlace[] {
    if (!places || !searchText) {
      return places;
    }
    return places.filter((i) =>
      i.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
