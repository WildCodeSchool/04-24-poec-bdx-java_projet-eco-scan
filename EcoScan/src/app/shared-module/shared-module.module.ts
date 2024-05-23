import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleRouting } from './shared-module-routing.module';
import { FooterComponent } from './components/feature/footer/footer.component';
import { CardComponent } from './components/feature/card/card.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { ModalComponent } from './components/ui/modal/modal.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { WasteCardComponent } from './components/ui/waste-card/waste-card.component';
import { BinTypePipe } from './shared/bin-type.pipe';
import { DumbCardComponent } from './components/ui/dumb-card/dumb-card.component';

@NgModule({
  declarations: [
    FooterComponent,
    CardComponent,
    HeaderComponent,
    ModalComponent,
    WasteCardComponent,
    BinTypePipe,
    DumbCardComponent,
  ],
  imports: [SharedModuleRouting, DialogModule, ButtonModule, FormsModule],
  exports: [
    FooterComponent,
    CardComponent,
    HeaderComponent,
    ModalComponent,
    WasteCardComponent,
    BinTypePipe,
  ],
})
export class SharedModule {}
