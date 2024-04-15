import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SpinningWheelService } from './spinning-wheel.service';
import { Observable } from 'rxjs';
import { TogoService } from './togo.service';
import { TogoPlace } from 'src/public/models/togo.model';

interface WheelSlice {
  cuisine: string;
  isActive: boolean;
}
@Injectable({ providedIn: 'root' })
export class WheelResolver  {
  constructor(private togoService: TogoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TogoPlace[]> {
    return this.togoService.fetchPlaces();
  }
}
