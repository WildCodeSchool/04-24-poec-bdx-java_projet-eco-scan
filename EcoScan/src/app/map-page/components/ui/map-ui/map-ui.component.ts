import { Component } from '@angular/core';

@Component({
  selector: 'app-map-ui',
  templateUrl: './map-ui.component.html',
  styleUrl: './map-ui.component.scss'
})
export class MapUiComponent {
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
  
}
