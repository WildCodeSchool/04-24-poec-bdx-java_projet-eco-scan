import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SidebarCloseAnimation, SidebarOpenAnimation } from './animation';
import { Nav } from '../../../models/nav.type';
import { HostService } from '../../../../host/shared/host.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetUser } from '../../../../host/models/getUser.type';
import { Observable } from 'rxjs';
import { UserService } from '../../../../shared-module/shared/services/user.service';

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

  @Input()
  user$: Observable<GetUser> = this.userService.getUser$();

  imagePath: string = 'assets/png/bar.png';
  mapSvg: string = 'assets/svg/map.svg';
  isOpen: boolean = false;
  navigation: Nav[] = [];

  constructor(
    private hostService: HostService,
    private routerNavigate: Router,
    private userService: UserService
  ) {}

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
        svg: 'assets/png/promotion.png',
        click: () => {
          this.routerNavigate.navigate(['/mypromos']);
        },
      },
      {
        title: 'Historique',
        svg: 'assets/png/fichier.png',
        click: () => {
          this.routerNavigate.navigate(['/historic']);
        },
      },
      {
        title: 'Déchets stockés',
        svg: 'assets/png/poubelle-1.png',
        click: () => {
          this.routerNavigate.navigate(['/staged']);
        },
      },
      {
        title: 'Comment ça marche ?',
        svg: 'assets/png/point-dinterrogation.png',
        click: () => {
          this.routerNavigate.navigate(['/glossary']);
        },
      },
      {
        title: 'Parametre',
        svg: 'assets/svg/setting.svg',
        click: () => {
          this.routerNavigate.navigate(['/setting']);
        },
      },
      {
        title: 'Déconnexion',
        svg: 'assets/svg/disconnect.svg',
        click: () => {
          this.logout();
        },
      },
    ];
  }
}
