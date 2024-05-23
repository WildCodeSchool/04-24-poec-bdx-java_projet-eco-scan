import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PromoAdminService } from '../../../shared/promo-admin.service';

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

function checkDateValidity(startDate: string, endDate: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startControl = control.get(startDate);
    const endControl = control.get(endDate);

    if (!startControl || !endControl) {
      return null;
    }

    const startVal: string = startControl.value;
    const endVal: string = endControl.value;

    if (startVal > endVal) {
      return { 'inValid dates': { beginnig: startVal, end: endVal } };
    } else {
      return null;
    }

  };
}

