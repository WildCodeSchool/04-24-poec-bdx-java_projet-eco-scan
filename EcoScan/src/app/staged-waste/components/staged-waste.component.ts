import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetUser } from '../../shared-module/models/types/GetUser.type';
import { Rubbish } from '../../shared-module/models/types/Rubbish.type';
import { Subscription } from 'rxjs';
import { StageWasteService } from '../shared/stage-waste.service';

@Component({
  selector: 'app-staged-waste',
  templateUrl: './staged-waste.component.html',
  styleUrl: './staged-waste.component.scss',
})
export class StagedWasteComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private stageService = inject(StageWasteService);

  user!: GetUser;
  subscription!: Subscription;
  stagedList$ = this.stageService.getWasteList$();
  hideSpinner$ = this.stageService.getSpinner$();

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    this.stageService.initializeWasteList(this.user.staged.rubbish);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleWasteDeleted(updatedRubbishList: Rubbish[]) {
    this.stageService.initializeWasteList(updatedRubbishList);
  }

  checkBinsAreClose(){
    this.stageService.checkProximityForAllWaste();
  }
}
