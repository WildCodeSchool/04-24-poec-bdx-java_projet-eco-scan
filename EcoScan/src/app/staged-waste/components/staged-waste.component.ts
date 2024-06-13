import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetUser } from '../../shared-module/models/types/getUser.type';
import { Rubbish } from '../../shared-module/models/types/Rubbish.type';

@Component({
  selector: 'app-staged-waste',
  templateUrl: './staged-waste.component.html',
  styleUrl: './staged-waste.component.scss',
})
export class StagedWasteComponent {
  user!: GetUser;
  wastesList!: Rubbish[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    this.wastesList = this.user.staged.rubbish;

  }
}
