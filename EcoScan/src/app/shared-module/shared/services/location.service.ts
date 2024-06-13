import { Injectable } from '@angular/core';
import { longLat } from '../../models/types/LongLat.type';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  public splitLongAndLat(loc: string): longLat {
    const [lat, lng] = loc.split(',').map((coord) => parseFloat(coord.trim()));
    return { lat, lng };
  }

}
