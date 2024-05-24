import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanRoutingModule } from './scan-routing.module';
import { ScanPageComponent } from './pages/scan-page/scan-page.component';
import { ScanComponent } from './components/scan/scan.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { SharedModule } from '../shared-module/shared-module.module';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [ScanPageComponent, ScanComponent],
  imports: [
    CommonModule,
    ScanRoutingModule,
    NgxScannerQrcodeModule,
    SharedModule,
  ],
})
export class ScanModule {}
