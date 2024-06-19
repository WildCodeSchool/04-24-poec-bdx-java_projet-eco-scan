import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPagesComponent } from './pages/landing-pages.component';
import { userResolver } from '../shared-module/shared/resolvers/user.resolver';
import { promoResolver } from '../shared-module/shared/resolvers/promo.resolver';

const routes: Routes = [
  {
    path: '',
    component: LandingPagesComponent,
    resolve: { user: userResolver, promos: promoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
