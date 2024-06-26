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
import { Subscription, forkJoin } from 'rxjs';
import { StagedRubbish } from '../../../shared-module/models/types/StagedRubbish.type';
import { SendUser } from '../../../shared-module/models/types/SendUser.type';
import {
  landingPageAnimation,
  openClosePageAnimation,
  scanPageAnimation,
} from '../../../shared-module/shared/services/route-animations';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss',
  animations: [openClosePageAnimation, scanPageAnimation],
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

  private makeNewRubbish(): void {
    this.scannedRubbish = {
      id: null,
      depot: false,
      type: this.scannedRubbish.type,
    };
    const sub = this.scanService
      .generateRubbish$(this.scannedRubbish)
      .subscribe((newRubbish) => (this.scannedRubbish.id = newRubbish.id));
    this.subscriptions.push(sub);
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    if (e.length > 0 && !this.scanData) {
      try {
        action?.stop();
        this.scanData = e[0].value;
        const rubbishId = JSON.parse(this.scanData).id;

        const sub = this.scanService
          .getRubbishById$(rubbishId)
          .subscribe((rubbish) => {
            this.scannedRubbish = rubbish;

            if (this.scannedRubbish.depot) {
              this.makeNewRubbish();
            }
            const sub = this.scanService
              .checkBinsAreClose(this.scannedRubbish)
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
      this.user.staged.rubbish.push(this.scannedRubbish);
      const stagedRubbish: StagedRubbish = {
        id: this.user.staged.id,
        userID: Number(this.user.id),
        rubbish: this.user.staged.rubbish,
      };

      const sub = this.scanService.stageRubbishForUser(stagedRubbish).subscribe(
        (response) => {
          this.userService.refreshUser();
          this.scannedRubbish = {} as Rubbish;
        },
        (error) => {
          this.messageService.add({
            severity: 'warn',
            summary: "N'a pas mis en scène les déchets",
            detail: "N'a pas mis en scène les déchets, essayez à nouveau",
          });
        }
      );
      this.subscriptions.push(sub);
      this.router.navigate(['/home']);
    }
  }

  convertUser(): SendUser {
    return {
      id: Number(this.user.id),
      points: this.user.points,
      email: this.user.email,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      username: this.user.username,
    };
  }

  makeDeposit(): void {
    if (this.scannedRubbish && this.user && this.binOfDeposit) {
      let newDeposit: Deposit = {
        id: null,
        user: {
          id: Number(this.user.id),
        },
        rubbish: {
          id: Number(this.scannedRubbish.id),
        },
        bin: {
          id: Number(this.binOfDeposit),
        },
        scanData: this.scanData,
      };
      this.user.points += this.scannedRubbish.type.points;

      const sub = forkJoin([
        this.scanService.sendDeposit$(newDeposit),
        this.scanService.updatePoints$(this.convertUser()),
      ]).subscribe((respDeposit) => {
        this.router.navigate(['/home']);
      });

      this.subscriptions.push(sub);
    }
  }
}
