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


const appRouter: Routes = [
  {
    path: 'auth',
    component: AuthorizationComponent
  },
  {
    path: 'structures',
    component: StructuresComponent
  },
  {
    path: 'members',
    component: MembersComponent
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
    MembersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouter),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
