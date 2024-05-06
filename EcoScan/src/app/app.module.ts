import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './shared-module/sliding-cards/card/card.component';
import { CardlistComponent } from './shared-module/sliding-cards/cardlist/cardlist.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule {}
