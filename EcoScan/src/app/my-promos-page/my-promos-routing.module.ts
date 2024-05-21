import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPromosPageComponent } from './pages/my-promos-page/my-promos-page.component';

const routes: Routes = [
  {path: '', component: MyPromosPageComponent},
  {path: 'mypromos', component: MyPromosPageComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPromosRoutingModule { }
