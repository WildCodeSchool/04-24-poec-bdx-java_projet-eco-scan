import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
} from 'ngx-scanner-qrcode';
import { ScanService } from '../../services/scan.service';
import { Rubbish } from '../../../shared-module/models/types/Rubbish.type';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss',
})
export class ScanComponent {
  scannedData!: Rubbish | undefined;

  infos: String[] = [
    'Scanner le Qr-code',
    'Récuperer les informations du déchet',
    'Jeter maintenant ou stocker pour plus tard',
  ];

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
        height: 300,
      },
    },
  };

  constructor(private router: Router, private scanService: ScanService) {}

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    if (e.length > 0) {
      const scannedDataString = e[0].value;
      console.log(scannedDataString);

      this.scannedData = JSON.parse(scannedDataString);
    }
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      );
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    };

    if (fn === 'start') {
      action[fn](playDeviceFacingBack);
    } else {
      action[fn]();
    }
  }

  sendToStaged() {
    this.scanService.addDurtyScan(this.scannedData as Rubbish);
    this.scannedData = undefined;

    //post to staged waste
  }

  navigateToPictureComponent() {
    this.router.navigate(['/picture']);
  }
}
