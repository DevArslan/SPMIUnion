import { NgModule } from '@angular/core';
import { AuthorizationComponent } from './authorization.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthRoutingModule } from './authorization-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AuthorizationComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, MatProgressBarModule],
  providers: [CommonModule],
})
export class AuthModule {}
