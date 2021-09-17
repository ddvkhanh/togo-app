import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TogoService } from 'src/public/common/service/togo.service';
import { TogoPlace } from 'src/public/models/togo.model';

@Component({
  selector: 'app-togo-list',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [TogoService],
})
export class TableComponent implements OnInit {
  selectedCategory: string;
  selectedVisitStatus: string;
  isEditing: boolean;

  constructor(
    private togoService: TogoService,
  ) {
    this.togoService.get();
  }

  ngOnInit() {}

  getPlaces(): TogoPlace[] {
    return this.togoService.getPlaces();
  }

  getPlace(id: any) {
    return this.togoService.getPlace(id);
  }

  deletePlace(id: any) {
    this.togoService.deletePlace(id);
  }

  savePlace(place: TogoPlace) {
    this.togoService.savePlace(place);
  }

  onNewPlace() {}

  getCategories(places: TogoPlace[]): String[] {
    return this.togoService.getCategories(places);
  }
}
