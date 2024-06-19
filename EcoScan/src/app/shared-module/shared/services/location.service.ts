import { Injectable, inject } from '@angular/core';
import { longLat } from '../../models/types/LongLat.type';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private messageService =  inject(MessageService);

  public splitLongAndLat(loc: string): longLat {
    const [lat, lng] = loc.split(',').map((coord) => parseFloat(coord.trim()));
    return { lat, lng };
  }

  updateUserLocation(): Observable<longLat> {
    return new Observable<longLat>((observer) =>{
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          observer.next(location);
          observer.complete();
        },
        () => {
          if (navigator.geolocation) {
            this.handleLocationError(true);
          } else {
            this.handleLocationError(false);
          }
        }
      );
    })
  }

  private handleLocationError(browserHasGeolocation: boolean): void {
    let error = browserHasGeolocation
      ? 'Erreur : Le service de géolocalisation a échoué.'
      : 'Erreur : Votre navigateur ne prend pas en charge la géolocalisation.';
    console.log(error);
    this.messageService.add({
      severity: 'warning',
      summary: 'Impossible de localiser',
      detail: error,
    });
  }

}
