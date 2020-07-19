import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules} from "@angular/router";
import { AuthorizationComponent } from './authorization/authorization.component';
import { StructuresComponent } from './main/pages/structures/structures.component';
import { MembersComponent } from './main/pages/members/members.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from "src/app/guards/auth-guard/auth.guard";
import { UsersComponent } from './main/pages/users/users.component';


const itemRoutes: Routes = [
  {
    path: 'structures/:id',
    component: StructuresComponent,
  },
  {
    path: 'members',
    component: MembersComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
]

const appRouter: Routes = [
  {
    path: 'main',
    redirectTo: '/main/members',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent, children: itemRoutes,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthorizationComponent
  },
  {
    path: '',
    redirectTo: '/main/members',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/main/members',
    pathMatch: 'full'
  },


]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRouter, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class RoutingModule { }
