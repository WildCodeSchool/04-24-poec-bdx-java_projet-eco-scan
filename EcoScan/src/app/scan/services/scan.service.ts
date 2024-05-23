import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Rubbish } from '../../shared-module/models/types/Rubbish.type';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  private durtyScan$ = new BehaviorSubject<Rubbish | null>(null);
  constructor() {}

  getDurtyScan$(): Observable<Rubbish | null> {
    return this.durtyScan$.asObservable();
  }

  addDurtyScan(scan: Rubbish): void {
    this.durtyScan$.next(scan);
  }

  insertImageIntoDatabase(imageData: string) {
    console.log('Image capturée:', imageData);
  }
}
