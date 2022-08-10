import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/togo-table/table.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/togo-form/form.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'togo/all', component: TableComponent },
  { path: 'form/create', component: FormComponent },
  { path: 'form/edit/:id', component: FormComponent },

  // { path: '**', component: TableComponent },
];

export const routing = RouterModule.forRoot(routes);
