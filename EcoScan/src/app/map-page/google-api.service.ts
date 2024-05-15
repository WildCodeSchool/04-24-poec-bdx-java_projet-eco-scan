/// <reference types="@types/google.maps" />
import { Injectable, inject } from '@angular/core';

import { Bin } from '../shared-module/models/types/Bin.type';
import { DataAccessorService } from '../shared-module/shared/data-accessor.service';
import { getWasteTypeString } from '../shared-module/models/enums/WasteType.enum';


interface MarkerTuple {
  marker: google.maps.marker.AdvancedMarkerElement
  binType: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(  ) { }

  private binList!: Bin[];
  private markerList: MarkerTuple[] = [];
  private DBAccessor = inject(DataAccessorService);
  private defaultPosition = { lat: 44.8455754131726, lng: -0.5730868208152291 };
  private map!: google.maps.Map;

  public async initDependencies(): Promise<void> {
    this.DBAccessor.getAllBins$().subscribe(bins => this.binList = bins);
  }

  public async filterBinMarkers(binType: string): Promise<void> {
    for (let marker of this.markerList) {
      if (marker.binType != binType) {
        marker.marker.map = null;
        console.log("Removing from map, " + marker.marker);
      } else {
        marker.marker.map = this.map;
        console.log("Adding to map, " + marker.marker);
      }
    }
  }

  private async createMap(): Promise<void> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    this.map = new Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 4,
        center: this.defaultPosition,
        mapId: 'EcoScanMap',
      }
    );
  }

  private async locateSelfAndCenter(dropPin: boolean = false) {
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {

        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const bounds = new google.maps.LatLngBounds();
        const point = new google.maps.LatLng(pos);

        bounds.extend(point);

        if (dropPin) {
          const pinBackground = new PinElement({
            background: '#FBBC04',
          });
          new AdvancedMarkerElement({
              map: this.map,
              position: pos,
              content: pinBackground.element,
          });
        }

        this.map.fitBounds(bounds);
        this.map.setZoom(16);
      },
      () => {
        this.handleLocationError(true, this.map.getCenter()!);
      }
    );
  }

  public async initMap(): Promise<void> {
    await this.createMap();
    await this.locateSelfAndCenter(true);

    const locationButton = document.createElement("button");
    locationButton.textContent = "Re-center map";
    locationButton.classList.add("custom-map-control-button");
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        this.locateSelfAndCenter(true);
      } else {
        this.handleLocationError(false, this.map.getCenter()!);
      }
    });
    await this.populateMapMarkers();
  }

  private async populateMapMarkers(): Promise<void> {
    for (let bin of this.binList) {
      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${bin.type + " bin"}</h3>`
      });
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: { lat: Number(bin.lat), lng: Number(bin.lng) },
      });
      marker.addListener("click", () => {
        infoWindow.open(this.map, marker);
      });
      this.markerList.push({ marker: marker, binType: getWasteTypeString(bin.type) });
    }
  }

  private handleLocationError(
    browserHasGeolocation: boolean,
    pos: google.maps.LatLng
  ): void {
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