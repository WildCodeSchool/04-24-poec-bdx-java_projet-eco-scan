import { Component, OnInit, inject } from '@angular/core';
import { GoogleApiService } from '../../../map-page/google-api.service';

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrl: './landing-pages.component.scss',
})
export class LandingPagesComponent implements OnInit{

  isOpen!: boolean;
  private googleApi = inject(GoogleApiService)
 
  ngOnInit(): void {
    this.googleApi.initDependencies();
  }

  onReceivedFromHeader(open: boolean): void {
    this.isOpen = open;
  }
}
