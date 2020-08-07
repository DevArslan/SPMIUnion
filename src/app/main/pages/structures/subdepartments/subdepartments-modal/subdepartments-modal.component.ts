import { Component, OnInit } from '@angular/core';
import { ModalService } from "../shared/modal.service";
import { ApiService } from "src/app/shared/api.service";
import { Subscription, of } from 'rxjs';

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

  private subscription: Subscription = new Subscription();

  constructor(private modalService: ModalService, private API: ApiService) { }

  async addSubDepartment() {
    if(this.title !== ''){
      await this.API.createSubDepartment(this.title, this.dataForModal.id)
    }
  }
  async editSubDepartment() {
    if(this.title !== ''){
      await this.API.editSubDepartment(this.title, this.departmentID, this.dataForModal.id)
    }
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    
    const subData = this.modalService.data$.subscribe((data) => {
      this.dataForModal = data

      if (this.action == 'add') {
        this.title = ''
      } else {
        this.title = this.dataForModal.subTitle
      }
    })
    const subState = this.modalService.stateOpen$.subscribe((state) => {

      this.stateOpen = state;
    })
    const subTitle = this.modalService.modalTitle$.subscribe((title) => {
      this.modalTitle = title;
    })
    const subAction = this.modalService.action$.subscribe((action) => {
      this.action = action
    })
    const subDep = this.API.departmentForEditModal$.subscribe(() => {
      this.faculty = this.API.departmentForEditModal$.getValue()
    })
    const subSubdep = this.API.subdepartment$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.API.error.next(String(this.error))
      } else {
        if (this.action == 'add') {
          this.API.responseOK.next('Подразделение успешно создано')
        } else {
          this.API.responseOK.next('Подразделение успешно изменено')
        }

        this.closeModal()
      }
    })

    this.subscription.add(subAction)
    this.subscription.add(subData)
    this.subscription.add(subDep)
    this.subscription.add(subState)
    this.subscription.add(subSubdep)
    this.subscription.add(subTitle)

  }

}

