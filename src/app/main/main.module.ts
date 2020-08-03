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
import { StructuresAddModalComponent } from './pages/structures/modals/structures-add-modal/structures-add-modal.component';
import { MembersTableComponent } from './pages/members/members-table/members-table.component';
import { MembersComponent } from "./pages/members/members.component";
import { CloseButtonComponent } from '../ui-components/close-button/close-button.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { StructuresNavComponent } from './nav/structures-nav/structures-nav.component';
import { StructuresNavFilterPipe } from '../pipes/structures-nav-filter.pipe';
import { StructuresTableComponent } from './pages/structures/structures-table/structures-table.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersTableComponent } from './pages/users/users-table/users-table.component';
import { MembersModalComponent } from './pages/members/members-modal/members-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { UsersModalComponent } from './pages/users/users-modal/users-modal.component';
import { SubdepartmentsModalComponent } from './pages/structures/subdepartments/subdepartments-modal/subdepartments-modal.component';
@NgModule({
  declarations: [
    ProfileComponent,
    ControlPanelComponent,
    StructuresComponent,
    StructuresCardComponent,
    MembersComponent,
    StructuresAddModalComponent,
    MainComponent,
    MembersModalComponent,
    MembersTableComponent,
    CloseButtonComponent,
    FilterPipe,
    StructuresNavComponent,
    StructuresNavFilterPipe,
    StructuresTableComponent,
    UsersComponent,
    UsersTableComponent,
    DeleteModalComponent,
    UsersModalComponent,
    SubdepartmentsModalComponent,
    // ModalComponent,
  ],
  imports: [MainRoutingModule, FormsModule, MatSnackBarModule, CommonModule],
  /* А вот ApiService уже здесь регистрируется, потому что
    он будет использовать только в этом модуле */
  providers: [ApiServiceService],
  bootstrap: [MainComponent],
})
export class MainModule {}
