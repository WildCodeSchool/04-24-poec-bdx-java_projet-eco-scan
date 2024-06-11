import { Component, ElementRef, ViewChild } from '@angular/core';
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
    'Jeter maintenant ou plus tard',
  ];

  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  @ViewChild('scannedSection') scannedSection!: ElementRef;

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
        height: 300,
      },
    },
  };

  constructor(private router: Router, private scanService: ScanService) {}

  private scrollToScannedSection(): void {
    this.scannedSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    if (e.length > 0) {
      const scannedDataString = e[0].value;
      console.log(scannedDataString);

      try {
        const scannedDataObj = JSON.parse(scannedDataString);
        const rubbishId = scannedDataObj.id;

        this.scanService.getRubbishById$(rubbishId).subscribe((rubbish) => {
          this.scannedData = rubbish;

          action?.stop();
          setTimeout(() => this.scrollToScannedSection(), 100);
        });
      } catch (error) {
        console.error('Invalid QR code format', error);
      }
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
    this.scannedData = undefined;

    // TODO POST to staged waste table && DELETE from rubbish table
  }

  navigateToPictureComponent() {
    this.scanService.addDurtyScan(this.scannedData as Rubbish);
    this.router.navigate(['/home']);
  }
}
