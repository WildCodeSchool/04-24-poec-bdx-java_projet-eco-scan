import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardlistComponent } from './sliding-cards/cardlist/cardlist.component';

import { SharedModuleRouting } from './shared-module-routing.module';
import { FooterComponent } from './components/feature/footer/footer.component';
import { CardComponent } from './sliding-cards/card/card.component';

@NgModule({
  declarations: [
    CardComponent,
    CardlistComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleRouting,
  ],
  exports:[
    FooterComponent
  ]
})
export class SharedModule { }
