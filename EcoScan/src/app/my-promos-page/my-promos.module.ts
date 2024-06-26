import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPromosRoutingModule } from './my-promos-routing.module';
import { MyPromosPageComponent } from './pages/my-promos-page/my-promos-page.component';
import { SharedModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [MyPromosPageComponent],
  imports: [CommonModule, MyPromosRoutingModule, SharedModule],
})
export class MyPromosModule {}
