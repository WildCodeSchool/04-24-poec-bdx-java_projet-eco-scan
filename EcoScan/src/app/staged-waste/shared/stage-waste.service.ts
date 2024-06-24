import { Injectable, inject } from '@angular/core';
import { ScanService } from '../../scan/services/scan.service';
import { Rubbish } from '../../shared-module/models/types/Rubbish.type';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { binClose } from './types/binClose.type';

@Injectable({
  providedIn: 'root'
})
export class StageWasteService {

  private scanService = inject(ScanService);
  wasteList$: BehaviorSubject<binClose[]> = new BehaviorSubject<binClose[]>([]);
  hideSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  wastesList: binClose[] = [];

  getWasteList$(): Observable<binClose[]> {
    return this.wasteList$;
  }

  getSpinner$(): Observable<boolean>{
    return this.hideSpinner$;
  }

  initializeWasteList(rubbishList: Rubbish[]) {
    if (!rubbishList) {
      this.wastesList = [];
    } else {
      this.wastesList = rubbishList.map((waste) => ({
        rubbish: waste,
        binClose: false,
      }));
    }
    this.wasteList$.next(this.wastesList);
  }

  checkProximityForAllWaste(): void {
    this.hideSpinner$.next(false);

    const observables: Observable<void>[] = this.wastesList.map(waste => 
      this.scanService.checkBinsAreClose(waste.rubbish).pipe(
        map((binId) => {
          waste.binClose = !!binId;
        })
      )
    );

    forkJoin(observables).subscribe({
      next: () => {
        this.wasteList$.next(this.wastesList);
        this.hideSpinner$.next(true);
      },
      error: (err) => {
        console.error('Error checking bins:', err);
        this.hideSpinner$.next(true);
      }
    });
  }

}
