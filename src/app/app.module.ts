import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { RoutingModule } from './routing.module'
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ProfileComponent } from './profile/profile.component';
import { ControlPanelComponent } from './nav/control-panel/control-panel.component';
import { StructuresComponent } from './main/pages/structures/structures.component';
import { StructuresCardComponent } from './main/pages/structures/structures-card/structures-card.component';
import { MembersComponent } from './main/pages/members/members.component';
import { StructuresAddModalComponent } from './main/pages/structures/modals/structures-add-modal/structures-add-modal.component';
// import { AuthService } from "./shared/auth.service";
import { MainComponent } from './main/main.component';
import { AuthGuard } from "src/app/guards/auth-guard/auth.guard";
import { FormsModule } from '@angular/forms';
import { MembersTableComponent } from './main/pages/members/members-table/members-table.component';
import { MembersAddModalComponent } from './main/pages/members/modals/members-add-modal/members-add-modal.component';
import { CloseButtonComponent } from './ui-components/close-button/close-button.component';
import { FilterPipe } from './pipes/filter.pipe';
import { StructuresNavComponent } from './main/pages/structures/structures-nav/structures-nav.component';
import { StructuresNavFilterPipe } from './pipes/structures-nav-filter.pipe';
import { StructuresTableComponent } from './main/pages/structures/structures-table/structures-table.component';
import { UsersComponent } from './main/pages/users/users.component';
import { UsersTableComponent } from './main/pages/users/users-table/users-table.component';
import { SubDepartmentsAddModalComponent } from './main/pages/structures/subdepartments/modals/sub-departments-add-modal/sub-departments-add-modal.component';
import { MembersDeleteModalComponent } from './main/pages/members/modals/members-delete-modal/members-delete-modal.component';
import { MembersEditModalComponent } from './main/pages/members/modals/members-edit-modal/members-edit-modal.component';
import { UsersAddModalComponent } from './main/pages/users/modals/users-add-modal/users-add-modal.component';
import { UsersDeleteModalComponent } from './main/pages/users/modals/users-delete-modal/users-delete-modal.component';
import { UsersEditModalComponent } from './main/pages/users/modals/users-edit-modal/users-edit-modal.component';
import { StructuresDeleteModalComponent } from './main/pages/structures/modals/structures-delete-modal/structures-delete-modal.component';
import { SubDepartmentsDelModalComponent } from './main/pages/structures/subdepartments/modals/sub-departments-del-modal/sub-departments-del-modal.component';
import { SubDepartmentsEditModalComponent } from './main/pages/structures/subdepartments/modals/sub-departments-edit-modal/sub-departments-edit-modal.component';
import { ConvertToIconsPipe } from './pipes/convert-to-icons.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar'



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
    CloseButtonComponent,
    FilterPipe,
    StructuresNavComponent,
    StructuresNavFilterPipe,
    StructuresTableComponent,
    UsersComponent,
    UsersTableComponent,
    SubDepartmentsAddModalComponent,
    MembersDeleteModalComponent,
    MembersEditModalComponent,
    UsersAddModalComponent,
    UsersDeleteModalComponent,
    UsersEditModalComponent,
    StructuresDeleteModalComponent,
    SubDepartmentsDelModalComponent,
    SubDepartmentsEditModalComponent,
    ConvertToIconsPipe,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RoutingModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  

}
