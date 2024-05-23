import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoComponent } from './components/photo/photo.component';
import { PhtoPageComponent } from './pages/phto-page/phto-page.component';
import { SharedModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [PhotoComponent, PhtoPageComponent],
  imports: [CommonModule, PhotoRoutingModule, SharedModule],
})
export class PhotoModule {}
