/// <reference types="@types/google.maps" />
import { Injectable, inject } from '@angular/core';

import { Bin } from '../shared-module/models/types/Bin.type';
import { DataAccessorService } from '../shared-module/shared/data-accessor.service';
import { getWasteTypeString } from '../shared-module/models/enums/WasteType.enum';
import { Observable, map, switchMap } from 'rxjs';


interface MarkerTuple {
  marker: google.maps.marker.AdvancedMarkerElement;
  binType: string;
}

interface MarkerLibrary {
  AdvancedMarkerElement: any;
  PinElement: any;
}

interface MapsLibrary {
  Map: any;
}


@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor() { }

  private DBAccessor = inject(DataAccessorService);
  private map!: google.maps.Map;
  private markerList: MarkerTuple[] = [];

  private markerElements$ = this.importMarkerLibrary();
  private mapElement$ = this.importMapLibrary();

  private importMarkerLibrary(): Observable<MarkerLibrary> {
    return new Observable(observer => {
      google.maps.importLibrary("marker").then((library) => {
        observer.next(library as MarkerLibrary);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  private importMapLibrary(): Observable<MapsLibrary> {
    return new Observable(observer => {
      google.maps.importLibrary("maps").then((library) => {
        observer.next(library as MapsLibrary);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  public initDependencies(): Observable<Bin[]> {
    return this.DBAccessor.getAllBins$();
  }


  public initMap(binList: Bin[]): Observable<void> {
    return this.createMap().pipe(
      switchMap(() => this.locateSelfAndCenter(true)),
      switchMap(() => this.populateMapMarkers(binList)),
      map(() => this.createLocateButton())
    );
  }


  public filterBinMarkers(binType: string): void {
    for (let marker of this.markerList) {
      if (marker.binType != binType) {
        marker.marker.map = null;
      } else {
        marker.marker.map = this.map;
      }
    }
  }

  private createMap(): Observable<void> {
    return this.mapElement$.pipe(
      map(mapLib => {
        const mapElement = mapLib.Map;
        this.map = new mapElement(
          document.getElementById('map') as HTMLElement,
          {
            zoom: 8,
            center: { lat: 44.8455754131726, lng: -0.5730868208152291 }, //Bassin a flot
            mapId: 'EcoScanMap',
          }
        );
      }));
  }

  private locateSelfAndCenter(dropPin: boolean = false): Observable<void> {
    return this.markerElements$.pipe(
      map(markerLib => {
        const advancedMarkerElement = markerLib.AdvancedMarkerElement;
        const PinElement = markerLib.PinElement;
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
              new advancedMarkerElement({
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
      })
    );
  }

  private populateMapMarkers(binList: Bin[]): Observable<void> {
    return this.markerElements$.pipe(
      map(markerLib => {
        for (let bin of binList) {
          const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${bin.type + " bin"}</h3>`
          });
          const advancedMarkerElement = markerLib.AdvancedMarkerElement;
          const marker = new advancedMarkerElement({
            map: this.map,
            position: { lat: Number(bin.lat), lng: Number(bin.lng) },
          });
          marker.addListener("click", () => {
            infoWindow.open(this.map, marker);
          });
          this.markerList.push({ marker: marker, binType: getWasteTypeString(bin.type) });
        }
      })
    );
  }

  private createLocateButton() {
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