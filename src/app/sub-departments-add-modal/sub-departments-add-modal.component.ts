import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { Input } from "@angular/core";
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";
@Component({
  selector: 'app-sub-departments-add-modal',
  templateUrl: './sub-departments-add-modal.component.html',
  styleUrls: ['./sub-departments-add-modal.component.scss']
})
export class SubDepartmentsAddModalComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService, private structureRouting: StructuresRoutingService) { }

  @Input() department
  subDepartmentDropdown: boolean = false
  departmentID:string
  title: string = ''

  dropDownSubDepartment(){
    this.subDepartmentDropdown = !this.subDepartmentDropdown
  }
  closeModal(){
    const modal = document.getElementById('subDepartmentAddModal')
    modal.style.display = "none";
  }
  async addSubDepartment(){
    // this.departmentID = this.apiServiceService.selectedDepartment
    this.departmentID = this.department.id
    await this.apiServiceService.createSubDepartment(this.title,this.departmentID)
    await this.apiServiceService.getDepartments()
    this.closeModal()
    // Ниже штука, чтобы сразу отобразить изменения
    // this.structureRouting.postData$.next('')
  }
  ngOnInit(): void {
  }

}
