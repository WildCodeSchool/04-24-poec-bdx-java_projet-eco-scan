import { Component, OnInit } from '@angular/core';
import { TransitionService } from '../../../shared/services/transition.service';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrl: './transition.component.scss',
})
export class TransitionComponent implements OnInit {
  showTransition: boolean = false;

  constructor(private transitionService: TransitionService) {}

  ngOnInit(): void {
    this.transitionService.showTransition$.subscribe((transition) => {
      this.showTransition = transition;
    });
  }
}
