/// <reference types="@types/google.maps" />
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor() { }

  private map!: google.maps.Map;
  private defaultPosition = { lat: 44.8455754131726, lng: -0.5730868208152291 };


  private async createMap(): Promise<void>{
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

  private async locateSelfAndCenter(){
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

        // this.map.setCenter(pos);
        // this.map.panTo(bounds.getCenter());
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
        this.locateSelfAndCenter();
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, this.map.getCenter()!);
      }
    });
  }

  async populateMapMarkers(): Promise<void>{
    //acquire bin co-ordinates
    //create and push markers to the map
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


  // const position = { lat: 44.8455754131726, lng: -0.5730868208152291 };
  // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  // The marker, positioned at Uluru
  // const marker = new AdvancedMarkerElement({
  //   map: this.map,
  //   position: position,
  //   title: 'Uluru'
  // });
