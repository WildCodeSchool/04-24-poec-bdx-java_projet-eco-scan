import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlossaryRoutingModule } from './glossary-routing.module';
import { GlossaryComponent } from './components/glossary/glossary.component';
import { GlossaryPageComponent } from './pages/glossary-page/glossary-page.component';
import { SharedModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [GlossaryComponent, GlossaryPageComponent],
  imports: [CommonModule, GlossaryRoutingModule, SharedModule],
})
export class GlossaryModule {}
