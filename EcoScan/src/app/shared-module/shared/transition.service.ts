import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransitionService {
  private _showTransition = new BehaviorSubject<boolean>(false);
  showTransition$ = this._showTransition.asObservable();

  startTransition() {
    this._showTransition.next(true);
  }

  endTransition() {
    setTimeout(() => {
      this._showTransition.next(false);
    }, 3500);
  }
}
