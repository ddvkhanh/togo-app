import { Pipe } from '@angular/core';
import { TogoPlace } from 'src/public/models/togo.model';

@Pipe({
  name: 'visitStatus',
  pure: false,
})
export class VisitStatusFilterPipe {
  transform(places: TogoPlace[], selectedStatus: string): TogoPlace[] {
    if (selectedStatus == 'visited') {
      return places.filter((p) => (p.isVisited == true));
    } else if (selectedStatus == 'active') {
      return places.filter((p) => (p.isVisited == false));
    } else {
      return places;
    }
  }
}
