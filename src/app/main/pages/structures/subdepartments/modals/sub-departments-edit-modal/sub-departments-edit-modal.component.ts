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

    await this.api.editSubDepartment(this.title, this.departmentID, this.subDepartmentId)

    this.api.subdepartment$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.api.error.next(String(this.error))
      } else {
        this.api.getDepartments()
        this.api.responseOK.next('Подразделение успешно изменено')
        this.closeModal()
      }
    })  
  }
  ngOnInit(): void {
    this.api.departmentForEditModal$.subscribe(()=>{
      this.faculty = this.api.departmentForEditModal$.getValue()
    })
  }

}
