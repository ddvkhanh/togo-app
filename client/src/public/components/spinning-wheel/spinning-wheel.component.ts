import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TogoService } from 'src/public/common/service/togo.service';
import { TogoPlace } from 'src/public/models/togo.model';
import { SpinningWheelService } from '../../common/service/spinning-wheel.service';
import { WheelSlice } from 'src/public/models/wheel-slice.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spinning-wheel',
  templateUrl: './spinning-wheel.component.html',
  styleUrls: ['./spinning-wheel.component.css'],
})
export class SpinningWheelComponent implements OnInit, AfterViewInit {
  @ViewChild('wheel') canvas: ElementRef;
  @ViewChild('spin') spinBtn: ElementRef;

  context: CanvasRenderingContext2D;
  randomAngle: number;
  sliceCircleAngle: number;
  numberOfSlices: number;
  spinBtnText: string = 'SPIN';

  isSpinning = false;
  isAccelerating = false;
  angVelMax = 0; // Random ang.vel. to accelerate to
  angVel = 0; // Current angular velocity
  animFrame = null; // Engine's requestAnimationFrame
  friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
  angVelMin = 0.002; // Below that number will be treated as a stop
  PI = Math.PI;
  TAU = 2 * this.PI;
  ang = 0; // Angle rotation in radians

  wheelSlices: WheelSlice[] = new Array();
  activeWheelSlices: WheelSlice[] = new Array();

  isSliceActive: boolean = true;

  constructor(
    private togoService: TogoService,
    private spinningWheelService: SpinningWheelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { wheel: TogoPlace[] }) => {
      const places = data.wheel;
      this.togoService.setPlaces(places);
      this.updateWheelSlices(places);
    });

    this.spinningWheelService.sliceChanged.subscribe((slices: WheelSlice[]) => {
      this.updateWheelSlices(slices);
    });
  }

  updateWheelSlices(data: (TogoPlace | WheelSlice)[]) {
    //if TogoPlace: check for unique cuisine, default isActive = true;
    //if WheelSlice: return as is
    if (data == undefined) {
      return;
    }
    const uniqueCuisines = [
      ...new Set(
        data.filter((item) => item && item.cuisine).map((item) => item.cuisine)
      ),
    ];

    const wheelSlices: WheelSlice[] = uniqueCuisines.map((cuisine) => {
      const existingSlice = data.find(
        (slice: TogoPlace | WheelSlice) =>
          slice instanceof WheelSlice && slice.cuisine === cuisine
      ) as WheelSlice;
      const isActive = existingSlice ? existingSlice.isActive : true;
      return new WheelSlice(cuisine, isActive);
    });

    this.wheelSlices = wheelSlices;

    this.activeWheelSlices = this.wheelSlices
      ? this.wheelSlices.filter((slice) => slice.isActive)
      : null;
    this.numberOfSlices = this.activeWheelSlices
      ? this.activeWheelSlices.length
      : 0;
    this.spinningWheelService.setWheelSlices(this.wheelSlices);

    this.initSpinningWheel();
  }

  getIndex = () =>
    Math.floor(
      this.numberOfSlices - (this.ang / this.TAU) * this.numberOfSlices
    ) % this.numberOfSlices;

  ngAfterViewInit() {
    this.initSpinningWheel();
  }

  initSpinningWheel() {
    if (this.canvas != undefined) {
      const canvas = this.canvas.nativeElement;
      this.context = canvas.getContext('2d');

      // Clear the entire canvas before drawing the new content
      this.context.clearRect(0, 0, canvas.width, canvas.height);

      const dia = canvas.width;
      const rad = dia / 2;
      const arc = this.TAU / this.numberOfSlices;

      //* Get index of current sector */

      this.activeWheelSlices.forEach((element, index) => {
        const ang = arc * index;
        this.context.save();
        // COLOR
        this.context.beginPath();
        let color = this.generatePastelColor(index);
        this.context.fillStyle = color;
        this.context.moveTo(rad, rad);
        this.context.arc(rad, rad, rad, ang, ang + arc);
        this.context.lineTo(rad, rad);
        this.context.fill();

        // TEXT
        //this.context.shadowColor = 'black';
        //this.context.shadowBlur = 7;
        this.context.translate(rad, rad);
        this.context.rotate(ang + arc / 2);
        this.context.textAlign = 'right';
        this.context.fillStyle = '#fff';
        this.context.font = 'bold 25px sans-serif';
        this.context.fillText(element.cuisine, rad - 10, 10);
        this.context.restore();
      });
      this.rotate();
    }
  }

  rotate() {
    const sector = this.activeWheelSlices[this.getIndex()];
    this.context.canvas.style.transform = `rotate(${
      this.ang - this.PI / 2
    }rad)`;
    this.spinBtnText = this.angVel
      ? this.activeWheelSlices[this.getIndex()].cuisine
      : this.spinBtnText;
  }

  generatePastelColor(index: number) {
    const number = index + 1;
    // Calculate RGB values based on the index
    const r = (number * 57) % 256; // Adjust multiplier for red
    const g = (number * 78) % 256; // Adjust multiplier for green
    const b = (number * 94) % 256; // Adjust multiplier for blue
    const color = `rgb(${r},${g},${b},0.6)`;
    return color;
  }

  onSpin() {
    if (this.isSpinning) return;
    this.isSpinning = true;
    this.isAccelerating = true;
    this.angVelMax = this.rand(0.25, 0.4);
    this.engine(); // Start engine!
  }

  frame() {
    if (!this.isSpinning) return;
    if (this.angVel >= this.angVelMax) this.isAccelerating = false;
    // Accelerate
    if (this.isAccelerating) {
      this.angVel ||= this.angVelMin; // Initial velocity kick
      this.angVel *= 1.06; // Accelerate
    }
    // Decelerate
    else {
      this.isAccelerating = false;
      this.angVel *= this.friction; // Decelerate by friction
      // SPIN END:
      if (this.angVel < this.angVelMin) {
        this.isSpinning = false;
        this.angVel = 0;
        cancelAnimationFrame(this.animFrame);
      }
    }
    this.ang += this.angVel; // Update angle
    this.ang %= this.TAU; // Normalize angle
    this.rotate(); // CSS rotate!
  }

  engine() {
    this.frame();
    this.animFrame = requestAnimationFrame(this.engine.bind(this));
  }

  rand = (m, M) => Math.random() * (M - m) + m;

  toggleSlice(index: number) {
    this.wheelSlices[index].isActive = !this.wheelSlices[index].isActive;

    this.spinningWheelService.toggleSlice(index);
  }
}
