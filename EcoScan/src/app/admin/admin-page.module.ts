import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './pages/admin-page.component';
import { MenuComponent } from './components/ui/menu/menu.component';
import { PromoFormComponent } from './components/feature/promo-form/promo-form.component';
import { PromoDisplayComponent } from './components/feature/promo-display/promo-display.component';
import { AdminStatsComponent } from './pages/admin-stats/admin-stats.component';
import { AdminPromosComponent } from './pages/admin-promos/admin-promos.component';
import { StatsDisplayComponent } from './components/feature/stats-display/stats-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminPageComponent,
    MenuComponent,
    PromoFormComponent,
    PromoDisplayComponent,
    AdminStatsComponent,
    AdminPromosComponent,
    StatsDisplayComponent
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminPageModule { }
