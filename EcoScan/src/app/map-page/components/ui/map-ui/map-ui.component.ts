import { Component, inject } from '@angular/core';
import { GoogleApiService } from '../../../google-api.service';

@Component({
  selector: 'app-map-ui',
  templateUrl: './map-ui.component.html',
  styleUrl: './map-ui.component.scss'
})
export class MapUiComponent {
  
  private googleApi = inject(GoogleApiService);
  binList:any[];
  selectedBins: any;

  constructor(){
    this.binList = [
      {name: "Glass"},
      {name: "Plastic"},
      {name: "Battery"},
      {name: "Paper"},
      {name: "Waste"},
    ];
  }

  refreshMarkers(){
    this.googleApi.filterBinMarkers(this.selectedBins.name);
  }

}
