import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { Input } from "@angular/core";
@Component({
  selector: 'app-sub-departments-add-modal',
  templateUrl: './sub-departments-add-modal.component.html',
  styleUrls: ['./sub-departments-add-modal.component.scss']
})
export class SubDepartmentsAddModalComponent implements OnInit {

  constructor(private api: ApiServiceService) { }

  @Input() department
  subDepartmentDropdown: boolean = false
  departmentID:string
  title: string = ''
  error: string =  ''

  dropDownSubDepartment(){
    this.subDepartmentDropdown = !this.subDepartmentDropdown
  }
  closeModal(){
    const modal = document.getElementById('subDepartmentAddModal')
    modal.style.display = "none";
    this.title = ''
  }
  async addSubDepartment(){
    // this.departmentID = this.apiServiceService.selectedDepartment
    this.departmentID = this.department.id

    await this.api.createSubDepartment(this.title,this.departmentID)

    this.api.subdepartment$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.api.error.next(String(this.error))
      } else {
        this.api.getDepartments()
        this.api.responseOK.next('Подразделение успешно создано')
        this.closeModal()
      }
    })

  }
  ngOnInit(): void {
  }

}
