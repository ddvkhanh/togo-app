import { FormControl, FormGroup, Validators } from '@angular/forms';

export class TogoFormControl extends FormControl {
  label: string;
  modelProperty: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }

  getValidationMessages(): string[] {
    let messages: string[] = [];
    if (this.errors) {
      for (let errorName in this.errors) {
        switch (errorName) {
          case 'required':
            messages.push(`You must enter a ${this.label}`);
          case 'minlength':
            messages.push(
              `You must enter at least ${this.errors?.minlength.requiredLength} characters for ${this.label}`
            );
        }
      }
    }
    console.log(messages);
    return messages;
  }
}

export class TogoFormGroup extends FormGroup {
  constructor() {
    super({
      name: new TogoFormControl('Name', 'name', '', Validators.required),
      category: new TogoFormControl(
        'Category',
        'category',
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
        ])     
      ),
      description: new TogoFormControl(
        'Description',
        'description',
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      location: new TogoFormControl(
        'Location',
        'location',
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
        ])        ),
    });
  }

  get togoControls(): TogoFormControl[] {
    return Object.keys(this.controls).map(
      (k) => this.controls[k] as TogoFormControl
    );
  }

  getFormValidationMessages(form: any): string[] {
    let messages: string[] = [];
    this.togoControls.forEach((c) =>
      c.getValidationMessages().forEach((m) => messages.push(m))
    );
    return messages;
  }
}
