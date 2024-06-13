import { Component } from '@angular/core';
import {
  openClosePageAnimation,
  openPageAnimation,
} from '../../../shared-module/shared/services/route-animations';

@Component({
  selector: 'app-staged-waste-page',
  templateUrl: './staged-waste-page.component.html',
  styleUrls: ['./staged-waste-page.component.scss'],
  animations: [openClosePageAnimation, openPageAnimation],
})
export class StagedWastePageComponent {}
