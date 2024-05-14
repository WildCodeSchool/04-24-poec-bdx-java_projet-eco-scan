import { Component, OnInit, inject } from '@angular/core';
import { G_API_KEY } from '../../../shared-module/shared/settings';
import { GoogleApiService } from '../../google-api.service';

declare var google: any;


@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements OnInit {

  private googleApi = inject(GoogleApiService);

  ngOnInit(): void {
    this.googleApi.initMap();
  }

  //create filter input to trigger this.googleApi.populateMapMarkers()

}
