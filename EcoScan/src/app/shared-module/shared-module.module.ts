import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleRouting } from './shared-module-routing.module';
import { FooterComponent } from './components/feature/footer/footer.component';
import { CardComponent } from './components/feature/card/card.component';
import { ModalComponent } from './components/ui/modal/modal.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    FooterComponent,
    CardComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleRouting,
    DialogModule,
    ButtonModule
  ],
  exports:[
    FooterComponent,
    CardComponent,
    ModalComponent
  ]
})

export class SharedModule { }
