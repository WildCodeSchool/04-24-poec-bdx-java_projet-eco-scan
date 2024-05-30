import { Component } from '@angular/core';
import { Rubbish } from '../../shared-module/models/types/Rubbish.type';
import { Observable, tap } from 'rxjs';
import { RubbishService } from '../../shared-module/shared/rubbish.service';

@Component({
  selector: 'app-staged-waste',
  templateUrl: './staged-waste.component.html',
  styleUrl: './staged-waste.component.scss',
})
export class StagedWasteComponent {
  wastesList: Observable<Rubbish[]> = this.rubbishService.getRubbish();

  constructor(private rubbishService: RubbishService) {}
}
