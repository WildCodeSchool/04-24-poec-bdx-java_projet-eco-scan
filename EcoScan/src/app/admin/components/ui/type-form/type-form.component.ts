import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeAdminService } from '../../../shared/type-admin.service';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrl: './type-form.component.scss'
})
export class TypeFormComponent {

  typeConstructor!: FormGroup;
  private typeService = inject(TypeAdminService);

  constructor(private formBuilder: FormBuilder) {
    this.typeConstructor = this.formBuilder.group({
      name: ['', [Validators.required]],
      pictogram: ['', [Validators.required]],
      description: ['', [Validators.required]],
      points: [0, [Validators.required]],

    });
  }

  onSubmit() {
    this.typeService.addType(this.typeConstructor.value);
    this.typeConstructor.reset();
    this.typeConstructor.markAsUntouched();
  }
}
