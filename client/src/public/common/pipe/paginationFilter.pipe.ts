import { Pipe, PipeTransform } from '@angular/core';
import { TogoPlace } from 'src/public/models/togo.model';

@Pipe({name: 'pagination'})
export class PaginationFilter implements PipeTransform {
    transform(places: TogoPlace[], selectedPage:number): TogoPlace[]  {
        const batch = 10;
        if (selectedPage == 0) {
            return places.slice(0, batch);
        } 
        console.log(places.slice(batch*selectedPage, batch*selectedPage + batch))
        return places.slice(batch*selectedPage, batch*selectedPage + batch);
    }
}