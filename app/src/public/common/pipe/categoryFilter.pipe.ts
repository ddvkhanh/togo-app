import { Pipe } from '@angular/core';
import { TogoPlace } from 'src/public/models/togo.model';

@Pipe({
  name: "category",
  pure: false,
})
export class CategoryFilterPipe {
  transform(places: TogoPlace[], selectedCategory: string): TogoPlace[] {
    return (selectedCategory == undefined || selectedCategory == "All")
      ? places
      : places.filter((p) => p.category == selectedCategory);
  }
}
