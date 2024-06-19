import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { MenuComponent } from './components/ui/menu/menu.component';
import { PromoFormComponent } from './components/ui/promo-form/promo-form.component';
import { PromoDisplayComponent } from './components/feature/promo-display/promo-display.component';
import { AdminStatsComponent } from './pages/admin-stats/admin-stats.component';
import { AdminPromosComponent } from './pages/admin-promos/admin-promos.component';
import { StatsDisplayComponent } from './components/feature/stats-display/stats-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromoAdminCardComponent } from './components/ui/promo-admin-card/promo-admin-card.component';
import { HeaderComponent } from './components/feature/header/header.component';
import { PromoIdDisplayComponent } from './components/ui/promo-id-display/promo-id-display.component';
import { AdminBrandsComponent } from './pages/admin-brands/admin-brands.component';
import { AdminTypesComponent } from './pages/admin-types/admin-types.component';
import { TypeFormComponent } from './components/ui/type-form/type-form.component';
import { TypeDisplayComponent } from './components/feature/type-display/type-display.component';
import { BrandDisplayComponent } from './components/feature/brand-display/brand-display.component';
import { BrandFormComponent } from './components/ui/brand-form/brand-form.component';
import { BrandCardComponent } from './components/ui/brand-card/brand-card.component';
import { TypeCardComponent } from './components/ui/type-card/type-card.component';


@NgModule({
  declarations: [
    MenuComponent,
    PromoFormComponent,
    PromoDisplayComponent,
    AdminStatsComponent,
    AdminPromosComponent,
    StatsDisplayComponent,
    PromoAdminCardComponent,
    HeaderComponent,
    PromoIdDisplayComponent,
    AdminBrandsComponent,
    AdminTypesComponent,
    TypeFormComponent,
    TypeDisplayComponent,
    BrandDisplayComponent,
    BrandFormComponent,
    BrandCardComponent,
    TypeCardComponent
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminPageModule { }
