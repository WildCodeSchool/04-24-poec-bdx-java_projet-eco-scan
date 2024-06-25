import { Component, OnDestroy, inject } from '@angular/core';
import { GoogleApiService } from '../../../shared/google-api.service';
import { Subscription } from 'rxjs';
import { MapService } from '../../../shared/map.service';
import { ActivatedRoute } from '@angular/router';


interface binSelection {
  name: string;
}

@Component({
  selector: 'app-map-ui',
  templateUrl: './map-ui.component.html',
  styleUrl: './map-ui.component.scss'
})
export class MapUiComponent implements OnDestroy {

  private googleApi = inject(GoogleApiService);
  private mapService = inject(MapService);
  private router = inject(ActivatedRoute);
  binList: binSelection[] = [];
  selectedBin!: binSelection;
  binNameSub!: Subscription;

  constructor() {
    this.binNameSub = this.mapService.getAllBinTypes$().subscribe(
      binTypes => {
        for (let binName of binTypes) {
          this.binList.push({ name: binName });
        }
        this.binList.push({ name: "Voir tout" });
        let binType = this.router.snapshot.paramMap.get('name');
        if (binType !== null) {
          this.selectedBin = { name: binType };
          this.refreshMarkers();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.binNameSub.unsubscribe();
  }

  refreshMarkers(): void {
    this.googleApi.filterBinMarkers(this.selectedBin.name);
  }

}
