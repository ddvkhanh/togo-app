import { Component, OnInit } from '@angular/core';
import { TogoService } from 'src/public/common/service/togo.service';
import { TogoPlace } from 'src/public/models/togo.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-togo-form',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css'],
  providers: [TogoService],
})
export class PlaceEditComponent implements OnInit {
  newPlace: TogoPlace = new TogoPlace();
  place: TogoPlace;
  formSubmitted: boolean = false;
  form: FormGroup;
  editMode: boolean = false;
  id: string;
  subscription: Subscription;

  private places: TogoPlace[] = new Array<TogoPlace>();

  constructor(
    private togoService: TogoService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      await this.createForm();
    });
  }

  submitForm(form: any) {
    this.formSubmitted = true;
    if (form.valid) {
      this.newPlace = {
        isVisited: form.value.isVisited,
        name: form.value.name,
        category: form.value.category,
        cuisine: form.value.cuisine,
        description: form.value.description,
        price: form.value.price,
        location: form.value.location,
        lastUpdatedWhen: new Date(),
      };

      if (this.editMode) {
        this.togoService.updatePlace(this.id, this.newPlace);
      } else {
        this.togoService.savePlace(this.newPlace);
      }
      this.newPlace = new TogoPlace();
      this.form.reset();
      this.formSubmitted = false;
    }
  }

  resetForm() {
    this.newPlace = new TogoPlace();
  }

  private async createForm() {
    this.form = this.fb.group({
      isVisited: false,
      name: ['', Validators.required],
      category: ['', Validators.required],
      cuisine: ['', Validators.pattern('^[a-zA-Z]*$')],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', Validators.pattern('^-?\\d*(\\.\\d+)?$')],
      location: ['', [Validators.required, Validators.pattern('^\\w*$')]],
    });

    if (this.editMode) {
      this.togoService
        .getPlace(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  onClear() {
    this.form.reset();
  }

  onGoBack() {
    this.togoService.onGoBack();
  }

  get isVisited() {
    return this.form.get('isVisited');
  }
  get name() {
    return this.form.get('name');
  }
  get category() {
    return this.form.get('category');
  }
  get description() {
    return this.form.get('description');
  }
  get location() {
    return this.form.get('location');
  }
  get cuisine() {
    return this.form.get('cuisine');
  }
  get price() {
    return this.form.get('price');
  }
  get lastUpdatedWhen() {
    return this.form.get('lastUpdatedWhen');
  }
}
