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
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [TogoService],
})
export class FormComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router
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
        description: form.value.description,
        location: form.value.location,
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
    let isVisited = false;
    let name = '';
    let category = '';
    let description = '';
    let location = '';

    this.form = this.fb.group({
      isVisited: false,
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5)]],
      location: ['', Validators.required],
    });

    if (this.editMode) {
      this.togoService
        .getPlace(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  onCancel() {
    this.togoService.cancelChange();
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
}
