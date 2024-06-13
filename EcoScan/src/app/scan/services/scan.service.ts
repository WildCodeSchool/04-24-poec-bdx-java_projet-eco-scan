import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, switchMap } from 'rxjs';
import { Rubbish } from '../../shared-module/models/types/Rubbish.type';
import { DataAccessorService } from '../../shared-module/shared/services/data-accessor.service';
import { Type } from '../../shared-module/models/types/Type.type';
import { longLat } from '../../shared-module/models/types/LongLat.type';
import { LocationService } from '../../shared-module/shared/services/location.service';

@Injectable({
  providedIn: 'root',
})
export class ScanService {

  constructor(
    private dbAccessor: DataAccessorService,
    private locationService: LocationService
  ) {}

  getRubbishById$(id: string): Observable<Rubbish> {
    return this.dbAccessor.getRubbishByID$(id);
  }

  stageRubbishForUser(id: number, rubbish: Rubbish): Observable<Rubbish> {
    return this.dbAccessor.addStagedRubbish$(id, rubbish);
  }


  checkBinsAreClose(rubbish: Rubbish, userLocation: longLat): Observable<boolean>{
    console.log("in bin location check");
    return this.dbAccessor.getType$(rubbish.type).pipe(
      switchMap(
        (type: Type) => {
          for (const bin of type.bins) {
            const binLocation = this.locationService.splitLongAndLat(bin.localisation);
            const latDiff = Math.abs(binLocation.lat - userLocation.lat);
            const lonDiff = Math.abs(binLocation.lng - userLocation.lng);
          
            if (latDiff <= 0.000135 && lonDiff <= 0.000135){
              return of(true);
            }
          }
          return of(false);
        }
      )
    );
  }
}
