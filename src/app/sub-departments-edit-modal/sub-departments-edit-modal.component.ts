import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { Input } from "@angular/core";
@Component({
  selector: 'app-sub-departments-edit-modal',
  templateUrl: './sub-departments-edit-modal.component.html',
  styleUrls: ['./sub-departments-edit-modal.component.scss']
})
export class SubDepartmentsEditModalComponent implements OnInit {

  @Input() subDepartmentId
  @Input() dataForModal

  constructor(private api: ApiServiceService) { }

  facultyDropdown: boolean = false
  title:string
  departmentID: number
  faculty: string = 'Факультет'

  selectFaculty(event){
    this.faculty =  event.target.dataset.selectFaculty
    this.departmentID = Number(event.target.dataset.selectId)
    this.dropDownFaculty()
  }
  dropDownFaculty(){
    this.facultyDropdown = !this.facultyDropdown
  }
  closeModal() {
    const modal = document.getElementById('subDepartmentEditModal')
    modal.style.display = "none";
  }
  async editSubDepartment() {
    
    await this.api.editSubDepartment(this.title, this.departmentID, this.subDepartmentId)
    await this.api.getDepartments()
    this.closeModal()
    // Ниже штука, чтобы сразу отобразить изменения
    // this.structureRouting.postData$.next('')

  }
  ngOnInit(): void {
  }

}
