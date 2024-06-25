import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const landingPageAnimation = trigger('landingPageAnimation', [
  transition(':leave', [
    style({
      position: 'absolute',
      width: '100%',
      backgroundColor: 'white',
      zIndex: 1000000,
    }),
    animate('1000ms ease', style({ transform: 'translateX(100%)' })),
  ]),
]);

export const openPageAnimation = trigger('openPageAnimation', [
  transition(':enter', [
    style({
      transform: 'translateX(100%)',
      position: 'relative',
      width: '100%',
      height: '100vh',
    }),
    animate('600ms ease', style({ transform: 'translateX(0%)' })),
  ]),
]);

export const openClosePageAnimation = trigger('openClosePageAnimation', [
  transition(':leave', [
    query(
      ':leave',
      style({
        position: 'absolute',
        width: '100%',
        height: '100vh',
        backgroundColor: 'white',
        zIndex: 1000000,
      }),
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [animate('600ms ease', style({ transform: 'translateX(100%)' }))],
        { optional: true }
      ),
    ]),
  ]),
]);

export const scanPageAnimation = trigger('scanPageAnimation', [
  transition(':enter', [
    style({
      transform: 'translateY(100%)',
      position: 'relative',
      width: '100%',
      height: '100vh',
    }),
    animate('600ms ease', style({ transform: 'translateY(0%)' })),
  ]),
]);

export const slider = trigger('routeAnimation', [
  transition('* => isLeft', slideTo('left')),
  transition('* => isRight', slideTo('right')),
  transition('isRight => *', slideTo('left')),
  transition('isLeft => *', slideTo('right')),
]);

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })], optional),
    group([
      query(
        ':leave',
        [animate('600ms ease', style({ [direction]: '100%' }))],
        optional
      ),
      query(
        ':enter',
        [animate('600ms ease', style({ [direction]: '0%' }))],
        optional
      ),
    ]),
  ];
}
