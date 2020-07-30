import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersRoutingModule } from './members-routing.module';

import { ModalService } from "./shared/modal.service";
// import { MembersModalComponent } from './members-modal/members-modal.component';

@NgModule({
  declarations: [
  //  MembersModalComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
  ],
  providers: [
    ModalService,
  ],
  exports: [],
})
export class MembersModule { }
