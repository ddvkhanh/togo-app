import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchSuggestion' })
export class SearchSuggestionFilterPipe implements PipeTransform {
  transform(matches: any[], searchText: string): any[] {
    if (!searchText) {
      return;
    } else if (!matches) {
      return [];
    }

    searchText = searchText.toLowerCase();
    return matches
      .filter((i) => i.toLowerCase().includes(searchText))
      .splice(0, 5);
  }
}
