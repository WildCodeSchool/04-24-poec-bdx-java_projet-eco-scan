import { Component, OnInit, inject } from '@angular/core';
import { GoogleApiService } from '../../google-api.service';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements OnInit{
  private googleApi = inject(GoogleApiService);

  ngOnInit(): void {
    this.googleApi.initDependencies().pipe(
      map(binList =>{
        this.googleApi.initMap(binList).subscribe();
      })
    ).subscribe();
  }

}
