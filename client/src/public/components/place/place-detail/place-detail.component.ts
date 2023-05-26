import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/public/app-constants';
import { TogoService } from 'src/public/common/service/togo.service';
import { TogoPlace } from 'src/public/models/togo.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
  providers: [TogoService],
})
export class PlaceDetailComponent implements OnInit {
  selectedVisitStatus: string;
  isEditing: boolean;
  @Input() place: TogoPlace = null;

  constructor(private togoService: TogoService, private router: Router) {}

  ngOnInit() {}

  getPlace(id: any): Observable<TogoPlace> {
    return this.togoService.getPlace(id);
  }

  getIconPerCategory(category: string): string {
    switch (category) {
      case 'Food & Drink':
        return 'fa-utensils';
      case 'Entertainment Venues':
        return 'fa-icons';
      case 'Travel':
        return 'fa-mountain-sun';
      default:
        return;
    }
  }

  deletePlace(id: any): void {
    this.togoService.deletePlace(id);
  }

  savePlace(place: TogoPlace): void {
    this.togoService.savePlace(place);
  }
}
