import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Rubbish } from '../../../shared-module/models/types/Rubbish.type';
import { RubbishService } from '../../../shared-module/shared/services/rubbish.service';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.component.html',
  styleUrl: './waste.component.scss',
})
export class WasteComponent {
  // wastesList: Observable<Rubbish[]> = this.rubbishService.getRubbish();

  constructor(private rubbishService: RubbishService) {}
}
