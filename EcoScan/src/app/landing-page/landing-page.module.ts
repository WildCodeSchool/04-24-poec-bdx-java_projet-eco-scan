import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HeaderNavComponent } from './components/feature/header-nav/header-nav.component';
import { LandingPagesComponent } from './pages/landing-pages/landing-pages.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [HeaderNavComponent, LandingPagesComponent],
  imports: [CommonModule, LandingPageRoutingModule, RouterLink, RouterOutlet],
})
export class LandingPageModule {}
