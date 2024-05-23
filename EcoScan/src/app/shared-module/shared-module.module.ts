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
import { DumbCardComponent } from './components/ui/dumb-card/dumb-card.component';

@NgModule({
  declarations: [
    FooterComponent,
    CardComponent,
    HeaderComponent,
    ModalComponent,
    DumbCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleRouting,
    DialogModule,
    ButtonModule,
    FormsModule
  ],
  exports:[
    FooterComponent,
    CardComponent,
    HeaderComponent,
    ModalComponent
  ]
})

export class SharedModule { }
