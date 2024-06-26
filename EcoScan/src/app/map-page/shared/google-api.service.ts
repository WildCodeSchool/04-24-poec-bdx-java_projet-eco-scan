/// <reference types="@types/google.maps" />
import { Injectable, inject } from '@angular/core';

import { Observable, of, tap } from 'rxjs';
import { DataAccessorService } from '../../shared-module/shared/services/data-accessor.service';
import { LocationService } from '../../shared-module/shared/services/location.service';
import { Bin } from '../../shared-module/models/types/Bin.type';

interface MarkerTuple {
  marker: google.maps.marker.AdvancedMarkerElement;
  binType: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  private DBAccessor = inject(DataAccessorService);
  private locationService = inject(LocationService);
  private map!: google.maps.Map;
  private markerList: MarkerTuple[] = [];

  public initMap(binList: Bin[]): Observable<void> {
    return this.createMap().pipe(
      tap(() => {
        this.locateSelfAndCenter(true);
        this.populateMapMarkers(binList);
        this.createLocateButton();
        this.initSearchBar();
      })
    );
  }

  public filterBinMarkers(binType: string): void {
    for (let marker of this.markerList) {
      if (marker.binType === binType || binType === 'Voir tout') {
        marker.marker.map = this.map;
      } else {
        marker.marker.map = null;
      }
    }
  }

  private createMap(): Observable<void> {
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 8,
        center: { lat: 44.8455754131726, lng: -0.5730868208152291 }, //Bassin a flot
        mapId: 'EcoScanMap',
      }
    );
    return of(void 0);
  }

  private locateSelfAndCenter(dropPin: boolean = false): void {
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
          this.createUserMarker(pos);
        }

        this.map.fitBounds(bounds);
        this.map.setZoom(16);
      },
      () => {
        this.handleLocationError(true, this.map.getCenter()!);
      }
    );
  }

  private createUserMarker(pos: { lat: number; lng: number }) {
    const pinBackground = new google.maps.marker.PinElement({
      background: '#FBBC04',
    });
    new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      position: pos,
      content: pinBackground.element,
    });
  }

  private populateMapMarkers(binList: Bin[]): void {
    for (let bin of binList) {
      const { lat, lng } = this.locationService.splitLongAndLat(
        bin.localisation
      );
      const infoWindow = new google.maps.InfoWindow({
        content: `<h3 class="chips-map">${
          bin.binName ? bin.binName : bin.type.name + ' bin'
        }</h3>`,
      });
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: this.map,
        position: { lat, lng },
      });
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
      this.markerList.push({
        marker: marker,
        binType: bin.type.name,
      });
    }
  }

  private createLocateButton(): void {
    const locationButton = document.createElement('button');
    locationButton.textContent = 'Se re-centrer';
    locationButton.classList.add(
      'custom-map-control-button',
      'recenter-button'
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      locationButton
    );
    locationButton.addEventListener('click', () => {
      if (navigator.geolocation) {
        this.locateSelfAndCenter(true);
      } else {
        this.handleLocationError(false, this.map.getCenter()!);
      }
    });
  }

  private initSearchBar(): void {
    const input = document.getElementById('mapSearch') as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds() as google.maps.LatLngBounds);
    });
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces() as google.maps.places.PlaceResult[];
      if (places.length == 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

  private handleLocationError(
    browserHasGeolocation: boolean,
    pos: google.maps.LatLng
  ): void {
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }
}
