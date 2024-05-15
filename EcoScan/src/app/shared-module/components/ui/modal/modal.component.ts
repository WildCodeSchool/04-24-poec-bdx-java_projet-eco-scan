import { Component } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
})
export class ModalComponent {
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
}