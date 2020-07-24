import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StructuresComponent } from "./structures.component";

const routes: Routes = [
  {
    path: '',
    component: StructuresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructuresRoutingModule { }
