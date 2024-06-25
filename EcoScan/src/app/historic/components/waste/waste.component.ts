import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetUser } from '../../../shared-module/models/types/GetUser.type';
@Component({
  selector: 'app-waste',
  templateUrl: './waste.component.html',
  styleUrl: './waste.component.scss',
})
export class WasteComponent {
  rubbishList: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const user: GetUser = this.route.snapshot.data['user'];
    this.rubbishList = user.deposits.map((deposit) => deposit.rubbish);
  }
}
