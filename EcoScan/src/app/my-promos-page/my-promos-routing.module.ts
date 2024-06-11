import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPromosPageComponent } from './pages/my-promos-page/my-promos-page.component';
import { userResolver } from '../shared-module/shared/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: MyPromosPageComponent,
    resolve: { user: userResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPromosRoutingModule {}
