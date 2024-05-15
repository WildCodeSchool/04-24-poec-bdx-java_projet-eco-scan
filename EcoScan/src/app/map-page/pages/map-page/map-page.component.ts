import { Component, OnInit, inject } from '@angular/core';
import { GoogleApiService } from '../../google-api.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements OnInit{
  private googleApi = inject(GoogleApiService);

  ngOnInit(): void {
    this.googleApi.initDependencies();
    this.googleApi.initMap();
  }

}
