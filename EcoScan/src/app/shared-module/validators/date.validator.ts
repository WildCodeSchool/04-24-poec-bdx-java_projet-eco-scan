import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const checkDateValidity = (startDate: string, endDate: string): ValidatorFn => {
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
