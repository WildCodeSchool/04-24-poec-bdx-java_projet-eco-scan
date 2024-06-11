import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  openClosePageAnimation,
  openPageAnimation,
} from '../../../shared-module/shared/services/route-animations';
import { UserService } from '../../../shared-module/shared/services/user.service';
import { GetUser } from '../../../host/models/getUser.type';
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
    this.user = this.route.snapshot.data['user'];
  }
}
