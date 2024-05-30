import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarCloseAnimation, SidebarOpenAnimation } from './animation';
import { Nav } from '../../../models/nav.type';
import { HostService } from '../../../../host/shared/host.service';
import { Router } from '@angular/router';

const animationParams = {
  menuWidth: '250px',
  animationStyle: '500ms ease',
};

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
  animations: [
    trigger('sideMenu', [
      transition(':enter', [
        useAnimation(SidebarOpenAnimation, {
          params: {
            ...animationParams,
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(SidebarCloseAnimation, {
          params: {
            ...animationParams,
          },
        }),
      ]),
    ]),
  ],
})
export class HeaderNavComponent {
  @Output()
  boolChange: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private hostService: HostService,
    private routerNavigate: Router
  ) {}

  imagePath: string = 'assets/svg/bar.png';
  mapSvg: string = 'assets/svg/map.svg';
  isOpen: boolean = false;
  navigation: Nav[] = [];

  sendIsOpenToParent() {
    this.isOpen = !this.isOpen;
    this.boolChange.emit(this.isOpen);
  }

  logout(): void {
    this.hostService.logout();
  }

  ngOnInit() {
    this.navigation = [
      {
        title: 'Mes Promos',
        svg: '/assets/svg/promotion.png',
        click: () => {
          this.routerNavigate.navigate(['/mypromos']);
        },
      },
      {
        title: 'Historique',
        svg: '/assets/svg/fichier.png',
        click: () => {
          this.routerNavigate.navigate(['/historic']);
        },
      },
      {
        title: 'Déchets stockés',
        svg: '/assets/svg/poubelle-1.png',
        click: () => {
          this.routerNavigate.navigate(['/staged']);
        },
      },
      {
        title: 'Comment ça marche ?',
        svg: '/assets/svg/point-dinterrogation.png',
        click: () => {
          this.routerNavigate.navigate(['/glossary']);
        },
      },
      {
        title: 'Parametre',
        svg: '/assets/svg/setting.svg',
        click: () => {
          this.routerNavigate.navigate(['/setting']);
        },
      },
      {
        title: 'Déconnexion',
        svg: '/assets/svg/disconnect.svg',
        click: () => {
          this.logout();
        },
      },
    ];
  }
}
