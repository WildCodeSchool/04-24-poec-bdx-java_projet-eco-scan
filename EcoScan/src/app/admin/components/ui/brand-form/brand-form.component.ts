import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandAdminService } from '../../../shared/brand-admin.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {

  brandConstructor!: FormGroup;
  private brandService = inject(BrandAdminService);


  constructor(private formBuilder: FormBuilder) {
    this.brandConstructor = this.formBuilder.group({
      title: ['', [Validators.required]],
      logo: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.brandService.createNewBrand(this.brandConstructor.value);
    this.brandConstructor.reset();
    this.brandConstructor.markAsUntouched();
  }

}
