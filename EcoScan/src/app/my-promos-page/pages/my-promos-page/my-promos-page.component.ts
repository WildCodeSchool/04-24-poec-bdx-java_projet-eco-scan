import { Component } from '@angular/core';
import {
  openClosePageAnimation,
  openPageAnimation,
} from '../../../shared-module/shared/services/route-animations';
import { GetUser } from '../../../shared-module/models/types/GetUser.type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-promos-page',
  templateUrl: './my-promos-page.component.html',
  styleUrls: ['./my-promos-page.component.scss'],
  animations: [openClosePageAnimation, openPageAnimation],
})
export class MyPromosPageComponent {
  user!: GetUser;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.user);

    this.user = this.route.snapshot.data['user'];
  }
}
