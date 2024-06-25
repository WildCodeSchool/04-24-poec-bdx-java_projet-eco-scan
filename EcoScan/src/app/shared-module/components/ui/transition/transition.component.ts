import { Component, OnInit } from '@angular/core';
import { TransitionService } from '../../../shared/services/transition.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.scss'],
  animations: [
    trigger('slideUp', [
      state('in', style({ transform: 'translateY(0)' })),
      state('out', style({ transform: 'translateY(-100%)' })),
      transition('in => out', [animate('2s ease-in')]),
    ]),
  ],
})
export class TransitionComponent implements OnInit {
  showTransition: boolean = false;

  constructor(private transitionService: TransitionService) {}

  ngOnInit(): void {
    this.transitionService.showTransition$.subscribe((transition) => {
      this.showTransition = transition;
    });
  }

  animationState() {
    return this.showTransition ? 'in' : 'out';
  }
}
