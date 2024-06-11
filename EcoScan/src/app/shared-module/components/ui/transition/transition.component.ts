import { Component, OnInit } from '@angular/core';
import { TransitionService } from '../../../shared/transition.service';
import { Router } from '@angular/router';

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
