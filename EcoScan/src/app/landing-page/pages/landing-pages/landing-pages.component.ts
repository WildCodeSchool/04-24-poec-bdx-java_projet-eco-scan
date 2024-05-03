import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrl: './landing-pages.component.scss',
})
export class LandingPagesComponent {
  isOpen!: boolean;

  onReceivedFromHeader(open: boolean): void {
    this.isOpen = open;
  }
}
