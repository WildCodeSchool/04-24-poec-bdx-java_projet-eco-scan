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
    { name: 'Bleu', hexCode: '215dad' },
    { name: 'Abricot', hexCode: 'e59e5e' },
    { name: 'Lavande', hexCode: 'a36da8' },
    { name: 'Citron vert', hexCode: '93daa1' },
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
    const sendPromo: SendPromo = {
      title: this.promoConstructor.value.title,
      item: this.promoConstructor.value.item,
      description: this.promoConstructor.value.description,
      percentOff: this.promoConstructor.value.percentOff,
      amount: this.promoConstructor.value.amount,
      color: this.promoConstructor.value.color,
      price: this.promoConstructor.value.price,
      startDate: this.promoConstructor.value.startDate,
      endDate: this.promoConstructor.value.endDate,
      brand: {
        id: this.promoConstructor.value.brand.id,
      },
    };

    this.promoService.addPromo(this.promoConstructor.value);
    this.promoConstructor.reset();
    this.promoConstructor.markAsUntouched();
  }
}
