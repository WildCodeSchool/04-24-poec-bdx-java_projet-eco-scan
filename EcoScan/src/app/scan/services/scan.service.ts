import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Rubbish } from '../../shared-module/models/types/Rubbish.type';
import { DataAccessorService } from '../../shared-module/shared/services/data-accessor.service';
import { Type } from '../../shared-module/models/types/Type.type';
import { longLat } from '../../shared-module/models/types/LongLat.type';
import { LocationService } from '../../shared-module/shared/services/location.service';
import { Deposit } from '../../shared-module/models/types/Deposits.type';
import { StagedRubbish } from '../../shared-module/models/types/StagedRubbish.type';
import { GetUser } from '../../shared-module/models/types/GetUser.type';
import { SendUser } from '../../shared-module/models/types/SendUser.type';

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

  stageRubbishForUser(stagedRubbish: StagedRubbish): Observable<StagedRubbish> {
    return this.dbAccessor.addStagedRubbish$(stagedRubbish);
  }

  sendDeposit$(newDeposit: Deposit) {
    return this.dbAccessor.addDeposit$(newDeposit);
  }

  updatePoints$(updatedUser: SendUser){
    return this.dbAccessor.updateUsersPoints$(updatedUser);
  }

  checkBinsAreClose(
    rubbish: Rubbish,
  ): Observable<string> {
    return this.dbAccessor.getType$(rubbish.type).pipe(
      switchMap((type: Type) => {
        return this.locationService.updateUserLocation().pipe(
          switchMap(location => {
            console.log(location);
            
            for (const bin of type.bins) {
              const binLocation = this.locationService.splitLongAndLat(
                bin.localisation
              );
              const latDiff = parseFloat(
                Math.abs(binLocation.lat - location.lat).toFixed(6)
              );
              const lngDiff = parseFloat(
                Math.abs(binLocation.lng - location.lng).toFixed(6)
              );
              console.log(latDiff + " - " + lngDiff);
              
              // if (latDiff <= 0.000135 && lngDiff <= 0.000135){ //in 15m
              if (latDiff <= 0.001 || lngDiff <= 0.001) {
                return of(bin.id);
              }
            }
            return of('');
          })
        );
      })
    );
  }
}
