import { Component, Input } from '@angular/core';
import { SecondRubbish } from '../../../../models/types/SecondRubbish.type';
import { Type } from '../../../../models/types/Type.type';

@Component({
  selector: 'app-point-card',
  templateUrl: './point-card.component.html',
  styleUrl: './point-card.component.scss',
})
export class PointCardComponent {
  @Input()
  rubbishDetail!: Type;
}
