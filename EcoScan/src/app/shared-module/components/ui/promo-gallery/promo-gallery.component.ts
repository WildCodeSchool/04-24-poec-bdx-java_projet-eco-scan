import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-promo-gallery',
  templateUrl: './promo-gallery.component.html',
  styleUrl: './promo-gallery.component.scss'
})
export class PromoGalleryComponent {

  @Input()
  title!:string;

  @Input()
  verticalCards!:boolean;
}
