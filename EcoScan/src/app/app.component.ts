import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { TransitionService } from './shared-module/shared/services/transition.service';

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
      } else if (event instanceof NavigationError) {
        this.transitionService.endTransition();
        this.router.navigate(['/register']);
      }
    });
  }
}
