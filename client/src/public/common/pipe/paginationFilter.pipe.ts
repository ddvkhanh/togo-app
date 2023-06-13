import { Pipe, PipeTransform } from '@angular/core';
import { TogoPlace } from 'src/public/models/togo.model';

@Pipe({ name: 'pagination' })
export class PaginationFilter implements PipeTransform {
  transform(
    items: TogoPlace[],
    currentPage: number,
    itemsPerPage: number
  ): TogoPlace[] {
    const startIndex = itemsPerPage * currentPage;
    const endIndex = startIndex + itemsPerPage - 1;
    return items.slice(startIndex, endIndex);
  }
}
