import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {
  landingPageAnimation,
  openPageAnimation,
  slider,
} from '../../shared-module/shared/services/route-animations';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { GetUser } from '../../shared-module/models/types/GetUser.type';

@Component({
  selector: 'app-historic-page',
  templateUrl: './historic-page.component.html',
  styleUrls: ['./historic-page.component.scss'],
  animations: [
    slider,
    landingPageAnimation,
    openPageAnimation,
    trigger('buttonState', [
      state(
        'inactive',
        style({
          backgroundColor: 'transparent',
          color: 'black',
        })
      ),
      state(
        'active',
        style({
          backgroundColor: 'green',
          color: 'white',
        })
      ),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
    ]),
    trigger('slideButton', [
      transition('inactive => active', [
        style({ backgroundColor: 'transparent', transform: 'translateX(0%)' }),
        animate(
          '600ms ease',
          style({ backgroundColor: 'green', transform: 'translateX(100%)' })
        ),
      ]),
      transition('active => inactive', [
        style({ backgroundColor: 'green', transform: 'translateX(100%)' }),
        animate(
          '600ms ease',
          style({ backgroundColor: 'transparent', transform: 'translateX(0%)' })
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricPageComponent {
  user!: GetUser;
  constructor(private route: ActivatedRoute) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  isWasteRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] === 'isRight';
  }

  isPromosRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] === 'isLeft';
  }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }
}
