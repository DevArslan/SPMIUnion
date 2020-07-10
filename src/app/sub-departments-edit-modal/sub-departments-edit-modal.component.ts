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
  @Input() subDepartmentTitle
  constructor(private api: ApiServiceService) { }

  facultyDropdown: boolean = false
  title: string
  departmentID: number
  faculty: string = 'Факультет'

  error: string = ''

  selectFaculty(event) {
    this.faculty = event.target.dataset.selectFaculty
    this.departmentID = Number(event.target.dataset.selectId)
    this.dropDownFaculty()
  }
  dropDownFaculty() {
    this.facultyDropdown = !this.facultyDropdown
  }
  closeModal() {
    const modal = document.getElementById('subDepartmentEditModal')
    modal.style.display = "none";
    this.faculty = 'Факультет' 
  }
  async editSubDepartment() {

    const promise = await this.api.editSubDepartment(this.title, this.departmentID, this.subDepartmentId)
    if (promise.error) {
      this.error = promise.messsage
    } else {
      await this.api.getDepartments()
      this.closeModal()
    }


    // Ниже штука, чтобы сразу отобразить изменения
    // this.structureRouting.postData$.next('')

  }
  ngOnInit(): void {
  }

}
