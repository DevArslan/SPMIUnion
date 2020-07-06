import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
@Component({
  selector: 'app-structures-add-modal',
  templateUrl: './structures-add-modal.component.html',
  styleUrls: ['./structures-add-modal.component.scss']
})
export class StructuresAddModalComponent implements OnInit {

  title: string;
  proforg: string;

  constructor(private api: ApiServiceService) { }

  ngOnInit(): void {
  }
  closeModal(){
    const modal = document.getElementById('structuresAddModal')
    modal.style.display = "none";
  }
  async createDepartment(){
    await this.api.createDepartment(this.title, this.proforg)
    await this.api.getDepartments()
    this.closeModal()
  }
}
