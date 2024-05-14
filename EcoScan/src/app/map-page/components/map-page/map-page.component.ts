/// <reference types="@types/google.maps" />
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { G_API_KEY } from '../../../shared-module/shared/settings';

declare var google: any;


@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements AfterViewInit {
  private map!:any;

  ngAfterViewInit(): void {
    this.initMap();
  }
  
  async initMap(): Promise<void> {
    // The location of Uluru
    const position = { lat: -25.344, lng: 131.031 };

    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    // The map, centered at Uluru
    this.map = new Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 4,
        center: position,
        mapId: 'DEMO_MAP_ID',
      }
    );

    // The marker, positioned at Uluru
    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: position,
      title: 'Uluru'
    });
  }

}
