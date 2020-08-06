import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiService } from "src/app/shared/api.service";
import { Subscription, of } from 'rxjs';
import { DeleteService } from "../../../shared/delete.service";
import { ModalService } from "../subdepartments/shared/modal.service";
@Component({
  selector: 'app-structures-table',
  templateUrl: './structures-table.component.html',
  styleUrls: ['./structures-table.component.scss']
})
export class StructuresTableComponent implements OnInit {
  @Input() selectedSubDepartments: {}[]
  @Input() dynamics: { 'subID': number, 'dynamic': number }[]
  subDepartmentId: number
  data: {id: number, subTitle: string, title:string, modalData: {}[]}
  dataForModal: {}[] = []
  currentSubDynamic: number
  departmentTitle: string = ''
  subDepartmentTitle: string = ''
  constructor(private apiServiceService: ApiService, private deleteService : DeleteService, private modalService: ModalService) { }
  private subscription: Subscription = new Subscription();
  getDynamic(id) {

    this.dynamics.forEach((item) => {
      if (id == item.subID) {
        this.currentSubDynamic = item.dynamic
      }
    })
  }
  downloadExcel(event) {
    const subID = event.target.parentElement.dataset.subdepartmentId
    const title = event.target.parentElement.dataset.subdepartmentTitle
    this.apiServiceService.downloadExcelSubDepartment(subID, title)
  }
  showDelModal(event) {
    this.subDepartmentId = event.target.parentElement.dataset.subdepartmentId
    this.deleteService.data$.next(this.subDepartmentId)
    this.deleteService.stateOpen$.next(true)
    this.deleteService.type$.next('subdepartmnet')
    this.deleteService.modalTitle$.next('Удалить подразделение')
  }
  showEditModal(event) {
    this.subDepartmentId = event.target.parentElement.dataset.subdepartmentId
    this.subDepartmentTitle = event.target.parentElement.dataset.title
    this.departmentTitle = event.target.parentElement.dataset.departmentTitle
    
    this.data = {id: this.subDepartmentId, subTitle: this.subDepartmentTitle, title: this.departmentTitle, modalData: this.dataForModal}
    
    
    this.apiServiceService.departmentForEditModal$.next(this.departmentTitle)

    this.modalService.data$.next(this.data)
    this.modalService.action$.next('edit')
    this.modalService.stateOpen$.next(true)
    this.modalService.modalTitle$.next('Изменить подразделение')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    
    // if (!this.apiServiceService.departments) {
    //   this.apiServiceService.getDepartments()
    // }


    const departmentsSub = this.apiServiceService.departments$.subscribe((dataFromApi) => {
      this.dataForModal = dataFromApi
    })
    this.subscription.add(departmentsSub)
  }


}
