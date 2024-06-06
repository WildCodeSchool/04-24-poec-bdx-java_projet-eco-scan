import { Component } from '@angular/core';
import {
  openClosePageAnimation,
  openPageAnimation,
} from '../../../shared-module/shared/route-animations';

@Component({
  selector: 'app-glossary-page',
  templateUrl: './glossary-page.component.html',
  styleUrls: ['./glossary-page.component.scss'],
  animations: [openClosePageAnimation, openPageAnimation],
})
export class GlossaryPageComponent {}
