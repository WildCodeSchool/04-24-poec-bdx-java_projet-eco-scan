import { Component, Input } from '@angular/core';
import { Rubbish } from '../../../models/types/Rubbish.type';

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
}
