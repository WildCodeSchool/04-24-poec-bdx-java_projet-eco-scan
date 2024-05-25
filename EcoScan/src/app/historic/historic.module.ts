import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricRoutingModule } from './historic-routing.module';
import { HistoricPageComponent } from './pages/historic-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HistoricPageComponent],
  imports: [CommonModule, HistoricRoutingModule, BrowserAnimationsModule],
})
export class HistoricModule {}
