import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TransitionService } from './shared-module/shared/transition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'EcoScan';

  constructor(
    private router: Router,
    private transitionService: TransitionService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && this.router.url === '') {
        this.transitionService.startTransition();
      } else if (event instanceof NavigationEnd) {
        this.transitionService.endTransition();
      }
    });
  }
}
