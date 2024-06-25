import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandAdminService } from '../../../shared/brand-admin.service';
import { Brand } from '../../../../shared-module/models/types/Brand.type';

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
    let newBrand: Brand = {
      id: null,
      title: this.brandConstructor.value.title,
      logo: this.brandConstructor.value.logo,
      logoPath: this.brandConstructor.value.logo
    }
    this.brandService.addBrand(newBrand);
    this.brandConstructor.reset();
    this.brandConstructor.markAsUntouched();
  }

}
