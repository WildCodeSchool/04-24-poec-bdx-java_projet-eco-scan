import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
} from 'ngx-scanner-qrcode';
import { ScanService } from '../../services/scan.service';
import { Rubbish } from '../../../shared-module/models/types/Rubbish.type';
import { GetUser } from '../../../host/models/getUser.type';
import { UserService } from '../../../shared-module/shared/services/user.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss',
})
export class ScanComponent {
  scannedData!: Rubbish | undefined;
  user!: GetUser;

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

  constructor(
    private router: Router,
    private scanService: ScanService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }

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

          console.log(this.scannedData);

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
    if (this.scannedData && this.user) {
      this.scanService
        .stageRubbishForUser(this.user.staged.id, this.scannedData)
        .subscribe(
          (response) => {
            console.log('Rubbish staged successfully', response);
            this.userService.refreshUser();
            this.scannedData = undefined;
          },
          (error) => {
            console.error('Failed to stage rubbish', error);
          }
        );
    }
  }

  navigateToPictureComponent() {
    // this.scanService(this.scannedData as Rubbish);
    this.router.navigate(['/home']);
  }
}
