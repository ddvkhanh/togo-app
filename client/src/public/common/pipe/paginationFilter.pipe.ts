import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from 'src/public/app-constants';
import { TogoPlace } from 'src/public/models/togo.model';

@Pipe({ name: 'pagination' })
export class PaginationFilter implements PipeTransform {
  transform(items: TogoPlace[], currentPage: number): TogoPlace[] {
    const itemsPerPage: number = Constants.MAX_ITEMS_PER_PAGE;
    const startIndex = itemsPerPage * currentPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }
}
