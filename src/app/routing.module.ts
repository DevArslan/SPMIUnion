import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth-guard/auth.guard';

const appRouter: Routes = [
  /* NOTE: Лучше выносить в отдельные модули. Плюс это одновременно еще и lazy load */
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authorization/authorization.module').then((m) => m.AuthModule),
  },
  /* NOTE: По идее достаточно редайректа нижнего */
  // {
  //   path: '',
  //   redirectTo: '/main/members',
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    redirectTo: '/main/members',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [
    /* NOTE: Здесь эти импорты не нужны, они оба импортируются просто в Module. А здесь только Роутер  */
    // CommonModule,
    // BrowserModule,
    RouterModule.forRoot(appRouter, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
