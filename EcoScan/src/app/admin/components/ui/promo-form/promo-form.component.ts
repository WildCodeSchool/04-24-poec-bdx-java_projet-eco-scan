import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromoAdminService } from '../../../shared/promo-admin.service';
import { checkDateValidity } from '../../../../shared-module/validators/date.validator';
import { Brand } from '../../../../shared-module/models/types/Brand.type';
import { BrandAdminService } from '../../../shared/brand-admin.service';
import { SendPromo } from '../../../../shared-module/models/SendPromo.type';

interface colorMap {
  name: string;
  hexCode: string;
}

@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrl: './promo-form.component.scss',
})
export class PromoFormComponent {
  promoConstructor!: FormGroup;
  private promoService = inject(PromoAdminService);
  private brandService = inject(BrandAdminService);

  brands!: Brand[];
  presetColors: colorMap[] = [
    { name: 'Menthe', hexCode: '84baa0' },
    { name: 'Gris clair', hexCode: 'd5e0db' },
    { name: 'Beige', hexCode: 'f1ece3' },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.brandService
      .getBrands$()
      .subscribe((inBrands) => (this.brands = inBrands));

    this.promoConstructor = this.formBuilder.group(
      {
        title: ['', [Validators.required]],
        item: ['', [Validators.required]],
        description: ['', [Validators.required]],

        percentOff: [0, [Validators.required]],
        amount: [0, [Validators.required]],
        color: ['', [Validators.required]],
        price: [0, [Validators.required]],
        brand: [null, [Validators.required]],

        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
      },
      {
        validators: checkDateValidity('startDate', 'endDate'),
      },
    );
  }

  onSubmit() {

    this.promoService.addPromo(this.promoConstructor.value);
    this.promoConstructor.reset();
    this.promoConstructor.markAsUntouched();
  }
}
