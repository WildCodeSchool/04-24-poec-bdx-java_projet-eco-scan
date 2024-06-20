import { Component, Input, inject } from '@angular/core';
import { Rubbish } from '../../../models/types/Rubbish.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waste-card',
  templateUrl: './waste-card.component.html',
  styleUrl: './waste-card.component.scss',
})
export class WasteCardComponent {
  @Input()
  binType!: Rubbish;

  @Input()
  isThrow: boolean = false;

  private router = inject(Router);

  navToMap() {
    this.router.navigate([`/map/${this.binType.type.name}`]);
  }

}
