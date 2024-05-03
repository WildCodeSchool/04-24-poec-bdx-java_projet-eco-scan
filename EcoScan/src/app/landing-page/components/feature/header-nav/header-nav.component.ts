import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarCloseAnimation, SidebarOpenAnimation } from './animation';
import { Nav } from '../../../models/nav.type';

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

  imagePath: string = '../../../../../assets/svg/bar.png';
  mapSvg: string = "'../../../../../assets/svg/map.svg'";
  isOpen: boolean = false;
  navigation: Nav[] = [
    {
      navigations: ['/mypromos'],
      title: 'My Promos',
      svg: '/assets/svg/promos.svg',
    },
    {
      navigations: ['/historic'],
      title: 'Historic',
      svg: '/assets/svg/historic.svg',
    },
    {
      navigations: ['/staged'],
      title: 'Staged Waste',
      svg: '/assets/svg/staged.svg',
    },
    {
      navigations: ['/setting'],
      title: 'Setting',
      svg: '/assets/svg/setting.svg',
    },
    {
      navigations: ['/login'],
      title: 'Disconnect',
      svg: '/assets/svg/disconnect.svg',
    },
  ];

  sendIsOpenToParent() {
    this.isOpen = !this.isOpen;
    this.boolChange.emit(this.isOpen);
  }
}
