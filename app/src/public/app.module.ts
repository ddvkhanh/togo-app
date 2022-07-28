import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './components/togo-table/table.component';
import { FormComponent } from './components/togo-form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryFilterPipe } from './common/pipe/categoryFilter.pipe';
import { VisitStatusFilterPipe } from './common/pipe/visitStatusFilter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchComponent } from './components/search/search.component';
import { TagsComponent } from './components/tags/tags.component';
import { SearchFilterPipe } from './common/pipe/searchFilter.pipe';
import { HighlightDirective } from './common/pipe/highlight.directive';
import { SearchFilterTablePipe } from './common/pipe/searchFilterTable.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableComponent,
    CategoryFilterPipe,
    VisitStatusFilterPipe,
    PaginationComponent,
    MenuComponent,
    SearchComponent,
    TagsComponent,
    SearchFilterPipe,
    SearchFilterTablePipe,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
