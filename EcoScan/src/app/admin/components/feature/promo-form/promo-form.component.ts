import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrl: './promo-form.component.scss'
})
export class PromoFormComponent {

  promoConstructor!:FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.promoConstructor = this.formBuilder.group({
      title: [''],
      item: [''],
      description: [''],

      percentOff: [0],
      redeemableAmount: [0],
      startDate: [],
      endDate: []
    });
  }

  onSubmit(){
    console.log(this.promoConstructor);
    
  }
}
