import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StagedWasteRoutingModule } from './staged-waste-routing.module';
import { StagedWasteComponent } from './components/staged-waste.component';
import { StagedWastePageComponent } from './pages/staged-waste-page/staged-waste-page.component';
import { SharedModule } from '../shared-module/shared-module.module';
import { ButtonModule } from 'primeng/button'

@NgModule({
  declarations: [StagedWasteComponent, StagedWastePageComponent],
  imports: [
    CommonModule,
    StagedWasteRoutingModule,
    SharedModule,
    ButtonModule
  ],
})
export class StagedWasteModule {}
