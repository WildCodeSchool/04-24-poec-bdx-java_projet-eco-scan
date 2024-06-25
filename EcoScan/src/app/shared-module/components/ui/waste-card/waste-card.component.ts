import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Rubbish } from '../../../models/types/Rubbish.type';
import { ActivatedRoute, Router } from '@angular/router';
import { ScanService } from '../../../../scan/services/scan.service';
import { GetUser } from '../../../models/types/GetUser.type';
import { Deposit } from '../../../models/types/Deposits.type';
import { DataAccessorService } from '../../../shared/services/data-accessor.service';

@Component({
  selector: 'app-waste-card',
  templateUrl: './waste-card.component.html',
  styleUrl: './waste-card.component.scss',
})
export class WasteCardComponent {
  user!: GetUser;

  @Input()
  rubbish!: Rubbish;

  @Input()
  isThrow: boolean = false;

  @Input()
  isBinClose: boolean = false;

  @Output() wasteDeleted = new EventEmitter<Rubbish[]>();

  private scanService = inject(ScanService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dbAccess = inject(DataAccessorService);

  navToMap() {
    this.router.navigate([`/map/${this.rubbish.type.name}`]);
  }

  throwWaste(rubbish: Rubbish) {
    if (this.isBinClose) {
      this.scanService.checkBinsAreClose(rubbish).subscribe((binId) => {
        if (binId) {
          const newDeposit: Deposit = {
            id: null,
            user: { id: Number(this.user.id) },
            rubbish: { id: Number(this.rubbish.id) },
            bin: { id: Number(binId) },
            scanData: 'Sample Scan Data',
          };

          this.scanService.sendDeposit$(newDeposit).subscribe({
            next: (res) => {
              this.isThrow = true;
              this.dbAccess
                .deleteStagedRubbish(this.user.staged.id, Number(rubbish.id))
                .subscribe({
                  next: (updatedRubbishList) => {
                    this.wasteDeleted.emit(updatedRubbishList);
                  },
                  error: (deleteErr) => {
                    console.error(
                      'Error deleting rubbish from staged',
                      deleteErr
                    );
                  },
                });
            },
            error: (err) => {
              console.error('Error during deposit', err);
            },
          });
        }
      });
    }
  }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }
}
