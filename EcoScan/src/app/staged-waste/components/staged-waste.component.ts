import { Component } from '@angular/core';
import { Rubbish } from '../../shared-module/models/types/Rubbish.type';
import { Observable } from 'rxjs';
import { RubbishService } from '../../shared-module/shared/rubbish.service';
import { StagedRubbish } from '../../shared-module/models/types/StagedRubbish.type';

@Component({
  selector: 'app-staged-waste',
  templateUrl: './staged-waste.component.html',
  styleUrl: './staged-waste.component.scss',
})
export class StagedWasteComponent {
  wastesList: Observable<StagedRubbish[]> = this.rubbishService.getStaged$();

  constructor(private rubbishService: RubbishService) {}

  ngOnInit() {
    this.rubbishService.getStaged$().subscribe((e) => console.log(e));
  }
}
