import { Component, inject } from '@angular/core';
import { GoogleApiService } from '../../../google-api.service';


interface binSelection {
  name: string;
}

@Component({
  selector: 'app-map-ui',
  templateUrl: './map-ui.component.html',
  styleUrl: './map-ui.component.scss'
})
export class MapUiComponent {
  
  private googleApi = inject(GoogleApiService);
  binList:binSelection[];
  selectedBins!: binSelection;

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
