import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card/card.component';
import { CardlistComponent } from './sliding-cards/cardlist/cardlist.component';



@NgModule({
  declarations: [
    CardListComponent,
    CardComponent,
    CardlistComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModuleModule { }
