import { Component, OnInit } from '@angular/core';
import { ModalService } from "../shared/modal.service";
import { ApiServiceService } from "src/app/shared/api-service.service";

@Component({
  selector: 'app-subdepartments-modal',
  templateUrl: './subdepartments-modal.component.html',
  styleUrls: ['./subdepartments-modal.component.scss']
})
export class SubdepartmentsModalComponent implements OnInit {

  action: string = '';
  stateOpen: boolean = false;
  modalTitle: string;
  dataForModal: any = {};

  subDepartmentDropdown: boolean = false
  departmentID: number
  title: string = ''
  error: string = ''
  facultyDropdown: boolean = false
  faculty: string = 'Факультет'

  constructor(private modalService: ModalService, private API: ApiServiceService) { }

  async addSubDepartment() {
    await this.API.createSubDepartment(this.title, this.dataForModal.id)
  }
  
  async editSubDepartment() {
    await this.API.editSubDepartment(this.title, this.departmentID, this.dataForModal.id)
  }

  dropDownFaculty() {
    this.facultyDropdown = !this.facultyDropdown
  }
  selectFaculty(event) {
    this.faculty = event.target.dataset.selectFaculty
    this.departmentID = Number(event.target.dataset.selectId)
    this.dropDownFaculty()
  }
  closeModal() {
    this.modalService.stateOpen$.next(false)
    this.faculty = 'Факультет'
    this.title = ''
  }

  ngOnInit(): void {
    this.modalService.data$.subscribe((data) => {
      this.dataForModal = data
      console.log(this.dataForModal)
      if(this.action == 'add'){
        this.title = ''
      }else{
        this.title = this.dataForModal.subTitle
      }
    })
    this.modalService.stateOpen$.subscribe((state) => {
      console.log(this.stateOpen)
      this.stateOpen = state;
    })
    this.modalService.modalTitle$.subscribe((title) => {
      this.modalTitle = title;
    })
    this.modalService.action$.subscribe((action) => {
      this.action = action
    })
    this.API.departmentForEditModal$.subscribe(() => {
      this.faculty = this.API.departmentForEditModal$.getValue()
    })
    this.API.subdepartment$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.API.error.next(String(this.error))
      } else {
        this.API.getDepartments()
        if (this.action == 'add') {
          this.API.responseOK.next('Подразделение успешно создано')
        } else {
          this.API.responseOK.next('Подразделение успешно изменено')
        }

        this.closeModal()
      }
    })
  }

}

