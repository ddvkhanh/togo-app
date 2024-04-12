import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlaceEditComponent } from './components/place-edit/place-edit.component';
import { PlaceDetailComponent } from './components/place/place-detail/place-detail.component';
import { PlaceListComponent } from './components/place/place-list.component';
import { SpinningWheelComponent } from './components/spinning-wheel/spinning-wheel.component';
import { WheelResolver } from './common/service/wheel.resolver';

const routes: Routes = [
  { path: '', component: PlaceListComponent },
  { path: 'togo/all', component: PlaceListComponent },
  { path: 'form/create', component: PlaceEditComponent },
  { path: 'form/edit/:id', component: PlaceEditComponent },
  {
    path: 'randomize',
    component: SpinningWheelComponent,
    resolve: { wheel: WheelResolver },
  },
  { path: '**', component: PlaceListComponent },
];

export const routing = RouterModule.forRoot(routes);
