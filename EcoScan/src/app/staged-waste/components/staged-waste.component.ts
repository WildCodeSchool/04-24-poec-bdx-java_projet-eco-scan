import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetUser } from '../../shared-module/models/types/GetUser.type';
import { Rubbish } from '../../shared-module/models/types/Rubbish.type';
import { ScanService } from '../../scan/services/scan.service';
import { BehaviorSubject, Subscription, interval, map, tap } from 'rxjs';

interface binClose {
  rubbish: Rubbish;
  binClose: boolean;
}
@Component({
  selector: 'app-staged-waste',
  templateUrl: './staged-waste.component.html',
  styleUrl: './staged-waste.component.scss',
})
export class StagedWasteComponent implements OnInit, OnDestroy {
  user!: GetUser;
  wastesList: binClose[] = [];
  wasteObv$: BehaviorSubject<binClose[]> = new BehaviorSubject<binClose[]>([]);
  subscription!: Subscription;
  private checkInterval = 5000;
  public binCloseStatuses: { [key: string]: binClose } = {}; // To track which bins are close
  // 20 seconds

  constructor(
    private route: ActivatedRoute,
    private scanService: ScanService,
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    console.log(this.user);

    // this.wastesList = this.user.staged.rubbish;
    this.wasteObv$.next(
      this.user.staged.rubbish.map((waste) => {
        let bc = { rubbish: waste, binClose: false };
        this.wastesList.push(bc);
        return bc;
      }),
    );
    this.subscription = interval(this.checkInterval).subscribe(() => {
      console.log('executin check');

      this.checkProximityForAllWaste();
    });
  }

  ngOnDestroy() {
    console.log('destryin check');

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  checkProximityForAllWaste() {
    for (let waste of this.wastesList) {
      this.scanService
        .checkBinsAreClose(waste.rubbish)
        .pipe(
          map((binId) => {
            waste.binClose = !!binId;
          }),
        )
        .subscribe();
    }
    this.wasteObv$.next(this.wastesList);
  }
}
