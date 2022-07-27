import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'search'})
export class SearchFilterPipe implements PipeTransform{
    transform(placeNames: any[], searchText: string): any[]{
        if (!placeNames || !searchText) {
            return [];
        }
        
        searchText = searchText.toLowerCase();
        return placeNames.filter(i => i.toLowerCase().includes(searchText));
    }
}