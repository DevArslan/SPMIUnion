import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";

@Component({
  selector: 'app-sub-departments-add-modal',
  templateUrl: './sub-departments-add-modal.component.html',
  styleUrls: ['./sub-departments-add-modal.component.scss']
})
export class SubDepartmentsAddModalComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService) { }

  subDepartmentDropdown: boolean = false
  departmentID:string = this.apiServiceService.selectedDepartment
  title: string = ''

  dropDownSubDepartment(){
    this.subDepartmentDropdown = !this.subDepartmentDropdown
  }
  closeModal(){
    const modal = document.getElementById('subDepartmentAddModal')
    modal.style.display = "none";
  }
  addSubDepartment(){
    this.apiServiceService.createSubDepartment(this.title,this.departmentID)
  }
  ngOnInit(): void {
  }

}
