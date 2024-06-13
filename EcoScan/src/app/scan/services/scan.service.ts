import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Rubbish } from '../../shared-module/models/types/Rubbish.type';
import { DataAccessorService } from '../../shared-module/shared/services/data-accessor.service';
import { Type } from '../../shared-module/models/types/Type.type';
import { longLat } from '../../shared-module/models/types/LongLat.type';
import { LocationService } from '../../shared-module/shared/services/location.service';
import { Deposit } from '../../shared-module/models/types/Deposits.type';

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

  sendDeposit$(newDeposit: Deposit){
    return this.dbAccessor.addDeposit$(newDeposit);
  }

  checkBinsAreClose(rubbish: Rubbish, userLocation: longLat): Observable<string>{
    console.log("in bin location check " + userLocation.lat + " " + userLocation.lng);
    return this.dbAccessor.getType$(rubbish.type).pipe(
      switchMap(
        (type: Type) => {
          for (const bin of type.bins) {
            const binLocation = this.locationService.splitLongAndLat(bin.localisation);
            const latDiff = parseFloat(Math.abs(binLocation.lat - userLocation.lat).toFixed(6));
            const lngDiff = parseFloat(Math.abs(binLocation.lng - userLocation.lng).toFixed(6));
            console.log(latDiff + " - " + lngDiff);
            
            // if (latDiff <= 0.000135 && lngDiff <= 0.000135){ //in 15m
            if (latDiff <= 0.0002 || lngDiff <= 0.0002){

              console.log("found a close bin");
              return of(bin.id);
            }
          }
          return of("");
        }
      )
    );
  }
}
