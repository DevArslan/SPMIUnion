import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ProfileComponent } from './profile/profile.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { StructuresComponent } from './structures/structures.component';
import { StructuresCardComponent } from './structures-card/structures-card.component';
import { MembersComponent } from './members/members.component';
import { StructuresAddModalComponent } from './structures-add-modal/structures-add-modal.component';
// import { AuthService } from "./shared/auth.service";
import { MainComponent } from './main/main.component';
import { AuthGuard } from "src/app/auth-guard/auth.guard";
import { FormsModule } from '@angular/forms';
import { MembersTableComponent } from './members-table/members-table.component';
import { MembersAddModalComponent } from './members-add-modal/members-add-modal.component';
import { CloseButtonComponent } from './ui-components/close-button/close-button.component';

const itemRoutes: Routes = [
  {
    path: 'structures',
    component: StructuresComponent
  },
  {
    path: 'members',
    component: MembersComponent
  },
]

const appRouter: Routes = [
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
    redirectTo: '/main',
    pathMatch: 'full'
  },

]

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    ProfileComponent,
    ControlPanelComponent,
    StructuresComponent,
    StructuresCardComponent,
    MembersComponent,
    StructuresAddModalComponent,
    MainComponent,
    MembersTableComponent,
    MembersAddModalComponent,
    CloseButtonComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouter),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}