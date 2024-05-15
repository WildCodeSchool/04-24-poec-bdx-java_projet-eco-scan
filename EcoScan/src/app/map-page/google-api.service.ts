/// <reference types="@types/google.maps" />
import { Injectable, OnInit, inject } from '@angular/core';
import { DataAccessorService } from '../shared-module/shared/data-accessor.service';
import { Bin } from '../shared-module/models/types/Bin.type';


@Injectable({
  providedIn: 'root'
})
export class GoogleApiService{

  constructor() { }
  
  initDependencies(){
    this.DBAccessor.getAllBins$().subscribe(bins => this.binList = bins);
  }

  private binList!: Bin[];
  private markerList!: google.maps.marker.AdvancedMarkerElement;
  private DBAccessor = inject(DataAccessorService);
  private defaultPosition = { lat: 44.8455754131726, lng: -0.5730868208152291 };
  private map!: google.maps.Map;


  private async createMap(): Promise<void> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    this.map = new Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 4,
        center: this.defaultPosition,
        mapId: 'DEMO_MAP_ID',
      }
    );
  }

  private async locateSelfAndCenter(dropPin: boolean = false) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(pos);
        const bounds = new google.maps.LatLngBounds();
        const point = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        bounds.extend(point);

        if (dropPin) {
          const infoWindow = new google.maps.InfoWindow();
          infoWindow.setPosition(pos);
          infoWindow.setContent("Current location");
          infoWindow.open(this.map);
        }
        this.map.fitBounds(bounds);
        this.map.setZoom(16);
      },
      () => {
        this.handleLocationError(true, this.map.getCenter()!);
      }
    );
  }

  async initMap(): Promise<void> {
    await this.createMap();
    await this.locateSelfAndCenter();

    const locationButton = document.createElement("button");
    locationButton.textContent = "Re-center map";
    locationButton.classList.add("custom-map-control-button");
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        this.locateSelfAndCenter(true);
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, this.map.getCenter()!);
      }
    });
    await this.populateMapMarkers();
  }

  async populateMapMarkers(): Promise<void> {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    for (let bin of this.binList) {
      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${bin.type + " bin"}</h3>`
      });
      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: {lat: Number(bin.lat), lng: Number(bin.lng)},
      });
      marker.addListener("click", () => {
        infoWindow.open(this.map, marker);
      });
      this.markerList.append(marker);
    }
  }

  handleLocationError(
    browserHasGeolocation: boolean,
    pos: google.maps.LatLng
  ) {
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }

}