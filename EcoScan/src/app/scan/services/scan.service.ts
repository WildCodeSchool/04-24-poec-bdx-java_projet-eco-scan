import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Rubbish } from '../../shared-module/models/types/Rubbish.type';
import { DataAccessorService } from '../../shared-module/shared/services/data-accessor.service';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  private durtyScan$ = new BehaviorSubject<Rubbish | null>(null);
  constructor(private dbAccessor: DataAccessorService) {}

  getRubbishById$(id: string): Observable<Rubbish> {
    return this.dbAccessor.getRubbishByID$(id);
  }

  getDurtyScan$(): Observable<Rubbish | null> {
    return this.durtyScan$.asObservable();
  }

  addDurtyScan(scan: Rubbish): void {
    this.durtyScan$.next(scan);
  }
}
