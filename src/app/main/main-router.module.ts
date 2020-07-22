import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StructuresComponent } from './pages/structures/structures.component';
import { MembersComponent } from './pages/members/members.component';
import { MainComponent } from './main.component';
import { UsersComponent } from './pages/users/users.component';

const itemRoutes: Routes = [
  {
    path: 'structures/:id',
    component: StructuresComponent,
  },
  {
    path: 'members',
    component: MembersComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
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
export class MainRoutingModule {}
