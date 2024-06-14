import { Component } from '@angular/core';
import { CardService } from '../../../shared-module/shared/services/card.service';
import { Promo } from '../../../shared-module/models/types/Promo.type';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GetUser } from '../../../shared-module/models/types/GetUser.type';
import { Rubbish } from '../../../shared-module/models/types/Rubbish.type';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrl: './promos.component.scss',
})
export class PromosComponent {
  user!: GetUser;
  promo!: Rubbish;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.user);

    this.user = this.route.snapshot.data['user'];
  }
}
