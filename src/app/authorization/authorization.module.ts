import { NgModule } from '@angular/core';
import { AuthorizationComponent } from './authorization.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './authorization-routing.module';

@NgModule({
  declarations: [AuthorizationComponent],
  imports: [AuthRoutingModule, FormsModule],
  providers: [CommonModule],
  bootstrap: [AuthorizationComponent],
})
export class AuthModule {}
