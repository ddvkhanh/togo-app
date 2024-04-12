import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WheelSlice } from 'src/public/models/wheel-slice.model';

@Injectable({
  providedIn: 'root',
})
export class SpinningWheelService {
  sliceChanged = new BehaviorSubject<WheelSlice[]>(null);
  wheelSlices: WheelSlice[] = new Array();

  toggleSlice(index: number) {
    this.sliceChanged.next(this.wheelSlices.slice());
  }

  setWheelSlices(wheelSlices: WheelSlice[]) {
    this.wheelSlices = wheelSlices;
  }

  getWheelSlices(): WheelSlice[] {
    return this.wheelSlices;
  }
}
