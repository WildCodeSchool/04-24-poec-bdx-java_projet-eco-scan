import { Component, OnDestroy, inject } from '@angular/core';
import { GoogleApiService } from '../../../shared/google-api.service';
import { Observable, Subscription, takeUntil } from 'rxjs';
import { MapService } from '../../../shared/map.service';


interface binSelection {
  name: string;
}

@Component({
  selector: 'app-map-ui',
  templateUrl: './map-ui.component.html',
  styleUrl: './map-ui.component.scss'
})
export class MapUiComponent implements OnDestroy{
  
  private googleApi = inject(GoogleApiService);
  private mapService = inject(MapService);
  binList: binSelection[] = [];
  selectedBins!: binSelection;
  binNameSub!: Subscription;

  constructor(){
    this.binNameSub = this.mapService.getAllBinTypes$().subscribe(
      binTypes => {
        for (let binName of binTypes) {
          this.binList.push({ name: binName});
        }
        this.binList.push({ name: "Voir tout"});
      }
    );
  }

  ngOnDestroy(): void {
    this.binNameSub.unsubscribe();
  }

  refreshMarkers(){
    this.googleApi.filterBinMarkers(this.selectedBins.name);
  }

}
