import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricRoutingModule } from './historic-routing.module';
import { HistoricPageComponent } from './pages/historic-page.component';
import { SharedModule } from '../shared-module/shared-module.module';
import { WasteComponent } from './components/waste/waste.component';
import { PromosComponent } from './components/promos/promos.component';
 
@NgModule({
  declarations: [HistoricPageComponent, WasteComponent, PromosComponent],
  imports: [CommonModule, HistoricRoutingModule, SharedModule],
})
export class HistoricModule {}
