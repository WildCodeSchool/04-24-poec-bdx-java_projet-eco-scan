import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleRouting } from './shared-module-routing.module';
import { FooterComponent } from './components/feature/footer/footer.component';
import { CardComponent } from './components/feature/card/card.component';
import { HeaderComponent } from './components/ui/header/header.component';

@NgModule({
  declarations: [
    FooterComponent,
    CardComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleRouting,
  ],
  exports:[
    FooterComponent,
    CardComponent,
    HeaderComponent
  ]
})

export class SharedModule { }
