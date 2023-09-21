import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinning-wheel',
  templateUrl: './spinning-wheel.component.html',
  styleUrls: ['./spinning-wheel.component.css'],
})
export class SpinningWheelComponent implements OnInit, AfterViewInit {
  randomAngle: number;
  sliceCircleAngle: number;
  numberOfSlices: number;
  sliceStyles: any[] = new Array();
  wheelStyle: any = {};

  data = [
    'Korean',
    'Vietnamese',
    'Mexican',
    'Greek',
    'Chinese',
    'Thai',
    'India',
    'Taiwan',
    'Italian',
    'US',
    'A',
    'B',

    'Taiwan',
    'Italian',
    'US',
  ];

  constructor() {}

  ngOnInit(): void {
    // Calculate the rotation angle for each spin
    this.randomAngle = Math.ceil(Math.random() * 3600);
    console.log(this.randomAngle);

    this.numberOfSlices = this.data.length;

    // Calculate the angle in degrees for each slice based on degrees in a circle)
    this.sliceCircleAngle = 360 / this.numberOfSlices;
    console.log('size of each slice ' + this.sliceCircleAngle);
    let renderedSlice = this.sliceCircleAngle + 10;
    console.log('renderedSlice ' + renderedSlice);

    this.data.forEach((element, index) => {
      debugger;
      index++;
      const backgroundColor = this.generatePastelColor(index);
      const sliceBackgroundColor = backgroundColor;
      const sliceTransform = 'rotate(' + this.sliceCircleAngle * index + 'deg)';
      const sliceClipPath =
        'polygon(0 0, ' +
        this.sliceCircleAngle +
        '% 0, 100% 100%, 0 ' +
        this.sliceCircleAngle +
        '%)';
      this.sliceStyles.push({
        'background-color': sliceBackgroundColor,
        transform: sliceTransform,
        'clip-path': sliceClipPath,
      });
    });
    debugger;
    console.log(this.sliceStyles);
  }

  ngAfterViewInit() {}

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
    // const selectedElement = document.getElementsByClassName('selected');
    // while (selectedElement.length > 0) {
    //   selectedElement[0].classList.remove('selected');
    // }

    // Calculate the rotation angle to which the wheel should be rotated based on the random angle and the slice angle
    let rotation =
      Math.round(this.randomAngle / this.sliceCircleAngle) *
      this.sliceCircleAngle;

    // Calculate the picked slice index
    let pickedIndex = Math.round(
      this.data.length - (rotation % 360) / this.sliceCircleAngle
    );
    pickedIndex =
      pickedIndex >= this.data.length
        ? pickedIndex % this.data.length
        : pickedIndex;

    // let pickedSlice = this.wheelOptions.get(pickedIndex);
    // pickedSlice.nativeElement.classList.add('selected');

    console.log(pickedIndex + ' ' + this.data[pickedIndex]);
    console.log(this.sliceStyles[pickedIndex]);

    this.wheelStyle = { transform: 'rotate(' + this.randomAngle + 'deg)' };
    this.randomAngle += Math.ceil(Math.random() * 3600);
    console.log(this.randomAngle);
  }
}
