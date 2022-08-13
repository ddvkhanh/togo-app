import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'search'})
export class SearchFilterPipe implements PipeTransform{
    transform(matches: any[], searchText: string): any[]{
        if (!matches || !searchText) {
            return [];
        }

        searchText = searchText.toLowerCase();
        return matches.filter(i => i.toLowerCase().includes(searchText));
    }
}