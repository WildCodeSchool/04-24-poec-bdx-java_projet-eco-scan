import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slider } from '../../shared-module/shared/route-animations';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-historic-page',
  templateUrl: './historic-page.component.html',
  styleUrls: ['./historic-page.component.scss'],
  animations: [
    slider,
    trigger('buttonState', [
      state('inactive', style({ backgroundColor: 'transparent' })),
      state('active', style({ backgroundColor: 'green' })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricPageComponent {
  constructor(private router: Router) {}

  prepareRoute(outlet: RouterOutlet) {
    if (this.router.url === '/home') {
      return null; // Ne retourne pas d'animation si on quitte la page historique
    }

    if (!this.isHistoricRoute(this.router.url)) {
      return null; // Ne retourne pas d'animation si on navigue en dehors de la page historique
    }

    return outlet?.activatedRouteData?.['animation'];
  }

  isWasteRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] === 'isRight';
  }

  isPromosRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] === 'isLeft';
  }

  private isHistoricRoute(url: string): boolean {
    return ['/historic/waste', '/historic/promos'].some((route) =>
      url.includes(route)
    );
  }
}
