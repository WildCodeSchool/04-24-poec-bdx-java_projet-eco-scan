import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { GoogleApiService } from '../../shared/google-api.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements OnInit, OnDestroy{
  private googleApi = inject(GoogleApiService);
  private dependeciesSub!: Subscription;
  private mapSub!: Subscription;
  
  ngOnInit(): void {
    this.dependeciesSub = this.googleApi.initDependencies().pipe(
      map(binList =>{
        this.mapSub = this.googleApi.initMap(binList).subscribe();
      })
    ).subscribe();
  }
  
  ngOnDestroy(): void {
    this.dependeciesSub.unsubscribe();
    this.mapSub.unsubscribe();
  }

}
