import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPagesComponent } from './pages/landing-pages.component';
import { userResolver } from '../shared-module/shared/resolvers/user.resolver';
import { promoResolver } from '../shared-module/shared/resolvers/promo.resolver';
import { promoByDateResolver } from '../shared-module/shared/resolvers/promo-by-date.resolver';
import { promoByPercentOffResolver } from '../shared-module/shared/resolvers/promo-by-percent-off.resolver';

const routes: Routes = [
  {
    path: '',
    component: LandingPagesComponent,
    resolve: {
      user: userResolver,
      promos: promoResolver,
      promoByPercent: promoByPercentOffResolver,
      promoByDate: promoByDateResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
