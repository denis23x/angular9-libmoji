import {
  animate,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fadeRouting = trigger('fadeRouting', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        opacity: 0
      }),
    ], { optional: true }),
    query(':enter', [
      animate('300ms ease', style({
        opacity: 1
      }))
    ], { optional: true })
  ])
]);
