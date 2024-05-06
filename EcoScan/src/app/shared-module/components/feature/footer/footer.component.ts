import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @Input()
  scanButton:boolean = false;
  @Input()
  captureButton:boolean = false;

}
