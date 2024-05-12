import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleRouting } from './shared-module-routing.module';
import { FooterComponent } from './components/feature/footer/footer.component';
import { CardComponent } from './components/feature/card/card.component';

@NgModule({
  declarations: [
    FooterComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleRouting,
  ],
  exports:[
    FooterComponent,
    CardComponent
  ]
})

export class SharedModule { }
