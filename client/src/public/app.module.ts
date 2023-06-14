import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlaceEditComponent } from './components/place-edit/place-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryVisitFilterPipe } from './common/pipe/categoryVisitFilter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchComponent } from './components/search/search.component';
import { TagsComponent } from './components/tags/tags.component';
import { SearchSuggestionFilterPipe } from './common/pipe/searchSuggestionFilter.pipe';
import { HighlightDirective } from './common/pipe/highlight.directive';
import { SearchFilterTablePipe } from './common/pipe/searchFilterTable.pipe';
import { PlaceDetailComponent } from './components/place/place-detail/place-detail.component';
import { PlaceListComponent } from './components/place/place-list.component';
import { PaginationFilter } from './common/pipe/paginationFilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PlaceEditComponent,
    PlaceDetailComponent,
    CategoryVisitFilterPipe,
    PaginationComponent,
    MenuComponent,
    SearchComponent,
    TagsComponent,
    SearchSuggestionFilterPipe,
    SearchFilterTablePipe,
    PaginationFilter,
    HighlightDirective,
    PlaceListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    routing,
  ],
  providers: [SearchFilterTablePipe, CategoryVisitFilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
