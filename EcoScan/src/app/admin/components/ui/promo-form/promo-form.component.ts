import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromoAdminService } from '../../../shared/promo-admin.service';
import { checkDateValidity } from '../../../../shared-module/validators/date.validator';

@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrl: './promo-form.component.scss'
})
export class PromoFormComponent {

  promoConstructor!: FormGroup;
  private promoService = inject(PromoAdminService);

  constructor(private formBuilder: FormBuilder) {
    this.promoConstructor = this.formBuilder.group({
      title: ['', [Validators.required]],
      item: ['', [Validators.required]],
      description: ['', [Validators.required]],

      percentOff: [0, [Validators.required]],
      redeemableAmount: [0, [Validators.required]],
      pointsNeeded: [0, [Validators.required]],

      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    },
      {
        validators: checkDateValidity('startDate', 'endDate')
      }
    );
  }

  onSubmit() {
    this.promoService.createNewPromo(this.promoConstructor.value);
    this.promoConstructor.reset();
    this.promoConstructor.markAsUntouched();
  }
}
