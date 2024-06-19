import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { GoogleApiService } from '../../shared/google-api.service';
import { ActivatedRoute } from '@angular/router';
import { Bin } from '../../../shared-module/models/types/Bin.type';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements OnInit, OnDestroy{
  private googleApi = inject(GoogleApiService);
  private route = inject(ActivatedRoute);
  private mapSub!: Subscription;
  
  ngOnInit(): void {
    const binList: Bin[] = this.route.snapshot.data['bins'];
    this.mapSub = this.googleApi.initMap(binList).subscribe();
  }
  
  ngOnDestroy(): void {
    this.mapSub.unsubscribe();
  }

}
