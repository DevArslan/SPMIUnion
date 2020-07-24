import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StructuresComponent } from './pages/structures/structures.component';
import { MembersComponent } from './pages/members/members.component';
import { MainComponent } from './main.component';
import { UsersComponent } from './pages/users/users.component';

const itemRoutes: Routes = [
  {
    path: 'structures/:id',
    loadChildren: () =>
      import('./pages/structures/structures.module').then((m) => m.StructuresModule),
  },
  {
    path: 'members',
    loadChildren: () =>
      import('./pages/members/members.module').then((m) => m.MembersModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
];

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: itemRoutes,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
