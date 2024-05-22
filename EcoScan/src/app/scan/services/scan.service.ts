import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rubbish } from '../../shared-module/models/types/Rubbish.type';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  private durtyScan$ = new BehaviorSubject<Rubbish[]>([]);
  constructor() {}

  getDurtyScan$(): Observable<Rubbish[]> {
    return this.durtyScan$.asObservable();
  }

  addDurtyScan(scan: Rubbish): void {
    this.durtyScan$.next([...this.durtyScan$.value, scan]);
  }
}
