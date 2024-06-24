import { Component, inject } from '@angular/core';
import { HostService } from '../../../../host/shared/host.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private hostService = inject(HostService);

  logout(): void {
    this.hostService.logout();
  }
}
