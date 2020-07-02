import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";

@Component({
  selector: 'app-structures-delete-modal',
  templateUrl: './structures-delete-modal.component.html',
  styleUrls: ['./structures-delete-modal.component.scss']
})
export class StructuresDeleteModalComponent implements OnInit {

  @Input() department

  constructor(private api: ApiServiceService) { }

  departmentID:string

  ngOnInit(): void {
  }
  closeModal(){
    const modal = document.getElementById('departmentDelModal')
    modal.style.display = "none";
  }
  deleteDepartment(){

    this.departmentID = this.department.id
    this.api.deleteDepartment(this.departmentID)
    this.closeModal()

    // Ниже штука, чтобы сразу отобразить изменения
    // this.structureRouting.postData$.next('')
  }

}
