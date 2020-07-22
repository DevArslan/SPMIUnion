import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationComponent } from './authorization.component';

const authRoutes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
