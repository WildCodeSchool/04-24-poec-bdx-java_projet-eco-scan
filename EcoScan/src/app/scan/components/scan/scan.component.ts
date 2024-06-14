import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
} from 'ngx-scanner-qrcode';
import { ScanService } from '../../services/scan.service';
import { Rubbish } from '../../../shared-module/models/types/Rubbish.type';
import { UserService } from '../../../shared-module/shared/services/user.service';
import { longLat } from '../../../shared-module/models/types/LongLat.type';
import { Deposit } from '../../../shared-module/models/types/Deposits.type';
import { GetUser } from '../../../shared-module/models/types/GetUser.type';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss',
})
export class ScanComponent implements OnDestroy {
  scannedRubbish!: Rubbish;
  scanData!: string;
  user!: GetUser;
  location!: longLat;
  inProximity: boolean = false;
  binOfDeposit!: string;
  subscriptions: Subscription[] = [];
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
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.updateUserLocation();
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length) {
      for (const sub of this.subscriptions) {
        sub.unsubscribe();
      }
    }
  }

  private scrollToScannedSection(): void {
    this.scannedSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    if (e.length > 0) {
      const scannedDataString = e[0].value;
      this.scanData = scannedDataString;

      try {
        const scannedDataObj = JSON.parse(scannedDataString);
        const rubbishId = scannedDataObj.id;

        const sub = this.scanService
          .getRubbishById$(rubbishId)
          .subscribe((rubbish) => {
            this.scannedRubbish = rubbish;

            console.log(this.scannedRubbish);

            action?.stop();

            const sub = this.scanService
              .checkBinsAreClose(this.scannedRubbish, this.location)
              .subscribe((binID) => {
                if (binID === '') {
                  this.inProximity = false;
                  this.messageService.add({
                    severity: 'warn',
                    summary: 'Aucune poubelle trouvée',
                    detail:
                      "Aucune poubelle trouvée à proximité, approchez-vous d'un bac",
                  });
                } else {
                  this.binOfDeposit = binID;
                  this.inProximity = true;
                }
              });
            this.subscriptions.push(sub);

            setTimeout(() => this.scrollToScannedSection(), 100);
          });
        this.subscriptions.push(sub);
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

  sendToStaged(): void {
    if (this.scannedRubbish && this.user) {
      const sub = this.scanService
        .stageRubbishForUser(this.user.staged.id, this.scannedRubbish)
        .subscribe(
          (response) => {
            console.log('Rubbish staged successfully', response);
            this.userService.refreshUser();
            this.scannedRubbish = {} as Rubbish;
          },
          (error) => {
            console.error('Failed to stage rubbish', error);
          }
        );
      this.subscriptions.push(sub);
    }
  }

  makeDeposit(): void {
    if (this.scannedRubbish && this.user && this.binOfDeposit) {
      let newDeposit: Deposit = {
        id: null,
        user: {
          id: Number(this.user.id),
        },
        rubbish: {
          id: this.scannedRubbish.id,
        },
        bin: {
          id: Number(this.binOfDeposit),
        },
        scanData: this.scanData,
      };
      const sub = this.scanService
        .sendDeposit$(newDeposit)
        .subscribe((respDeposit) => {
          console.log(respDeposit);
          this.router.navigate(['/home']);
        });
      this.subscriptions.push(sub);
    }
  }

  updateUserLocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      () => {
        if (navigator.geolocation) {
          this.handleLocationError(true);
        } else {
          this.handleLocationError(false);
        }
      }
    );
  }

  private handleLocationError(browserHasGeolocation: boolean): void {
    let error = browserHasGeolocation
      ? 'Erreur : Le service de géolocalisation a échoué.'
      : 'Erreur : Votre navigateur ne prend pas en charge la géolocalisation.';
    console.log(error);
    this.messageService.add({
      severity: 'warn',
      summary: 'Impossible de localiser',
      detail: error,
    });
  }
}
