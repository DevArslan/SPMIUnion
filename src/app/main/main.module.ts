import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ApiServiceService } from '../shared/api-service.service';
import { MainRoutingModule } from './main-router.module';
import { ProfileComponent } from './profile/profile.component';
import { ControlPanelComponent } from './nav/control-panel/control-panel.component';
import { StructuresComponent } from './pages/structures/structures.component';
import { StructuresCardComponent } from './pages/structures/structures-card/structures-card.component';
import { MembersComponent } from './pages/members/members.component';
import { StructuresAddModalComponent } from './pages/structures/modals/structures-add-modal/structures-add-modal.component';
import { MembersTableComponent } from './pages/members/members-table/members-table.component';
import { MembersAddModalComponent } from './pages/members/modals/members-add-modal/members-add-modal.component';
import { CloseButtonComponent } from '../ui-components/close-button/close-button.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { StructuresNavComponent } from './nav/structures-nav/structures-nav.component';
import { StructuresNavFilterPipe } from '../pipes/structures-nav-filter.pipe';
import { StructuresTableComponent } from './pages/structures/structures-table/structures-table.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersTableComponent } from './pages/users/users-table/users-table.component';
import { SubDepartmentsAddModalComponent } from './pages/structures/subdepartments/modals/sub-departments-add-modal/sub-departments-add-modal.component';
import { MembersDeleteModalComponent } from './pages/members/modals/members-delete-modal/members-delete-modal.component';
import { MembersEditModalComponent } from './pages/members/modals/members-edit-modal/members-edit-modal.component';
import { StructuresDeleteModalComponent } from './pages/structures/modals/structures-delete-modal/structures-delete-modal.component';
import { SubDepartmentsDelModalComponent } from './pages/structures/subdepartments/modals/sub-departments-del-modal/sub-departments-del-modal.component';
import { SubDepartmentsEditModalComponent } from './pages/structures/subdepartments/modals/sub-departments-edit-modal/sub-departments-edit-modal.component';
import { ModalComponent } from "../ui-components/modal/modal.component";
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    ProfileComponent,
    ControlPanelComponent,
    StructuresComponent,
    StructuresCardComponent,
    MembersComponent,
    StructuresAddModalComponent,
    MainComponent,
    MembersTableComponent,
    MembersAddModalComponent,
    ModalComponent,
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
    StructuresDeleteModalComponent,
    SubDepartmentsDelModalComponent,
    SubDepartmentsEditModalComponent,
  ],
  imports: [MainRoutingModule, FormsModule, MatSnackBarModule, CommonModule],
  /* А вот ApiService уже здесь регистрируется, потому что
    он будет использовать только в этом модуле */
  providers: [ApiServiceService],
  bootstrap: [MainComponent],
})
export class MainModule {}
