import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  openClosePageAnimation,
  openPageAnimation,
} from '../../../shared-module/shared/route-animations';
import { UserService } from '../../../shared-module/shared/user.service';
import { GetUser } from '../../../host/models/getUser.type';

@Component({
  selector: 'app-my-promos-page',
  templateUrl: './my-promos-page.component.html',
  styleUrls: ['./my-promos-page.component.scss'],
  animations: [openClosePageAnimation, openPageAnimation],
})
export class MyPromosPageComponent {
  user$: Observable<GetUser> = this.userService.getUser$();

  constructor(private userService: UserService) {}
}
