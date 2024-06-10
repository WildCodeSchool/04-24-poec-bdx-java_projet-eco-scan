import { NgModule } from '@angular/core';
import { SharedModuleRouting } from './shared-module-routing.module';
import { FooterComponent } from './components/feature/footer/footer.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { ModalComponent } from './components/ui/modal/modal.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { WasteCardComponent } from './components/ui/waste-card/waste-card.component';
import { BinTypePipe } from './pipes/bin-type.pipe';
import { DumbCardComponent } from './components/ui/dumb-card/dumb-card.component';
import { CommonModule } from '@angular/common';
import { PointCardComponent } from './components/ui/point-card/point-card/point-card.component';
import { ThousandKPipe } from './pipes/thousand-k.pipe';
import { PromoGalleryComponent } from './components/ui/promo-gallery/promo-gallery.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ModalComponent,
    WasteCardComponent,
    BinTypePipe,
    DumbCardComponent,
    PointCardComponent,
    ThousandKPipe,
    PromoGalleryComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleRouting,
    DialogModule,
    ButtonModule,
    FormsModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ModalComponent,
    WasteCardComponent,
    BinTypePipe,
    PointCardComponent,
    DumbCardComponent,
    PromoGalleryComponent,
    ThousandKPipe
  ],
})
export class SharedModule {}
