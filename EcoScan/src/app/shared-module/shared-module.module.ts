import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleRouting } from './shared-module-routing.module';
import { FooterComponent } from './components/feature/footer/footer.component';

@NgModule({
  declarations: [
    FooterComponent
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
