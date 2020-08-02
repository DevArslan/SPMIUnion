import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";
import { Subscription, of } from 'rxjs';
import { DeleteService } from "../../../shared/delete.service";
@Component({
  selector: 'app-structures-table',
  templateUrl: './structures-table.component.html',
  styleUrls: ['./structures-table.component.scss']
})
export class StructuresTableComponent implements OnInit {
  @Input() selectedSubDepartments: {}[]
  @Input() dynamics: { 'subID': number, 'dynamic': number }[]
  subDepartmentId: number
  data: {}[]
  dataForModal: {}[] = []
  currentSubDynamic: number
  departmentTitle: string = ''
  subDepartmentTitle: string = ''
  constructor(private apiServiceService: ApiServiceService, private deleteService : DeleteService) { }
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
    console.log(event.target.parentElement)
    this.subDepartmentId = event.target.parentElement.dataset.subdepartmentId
    this.deleteService.data$.next(this.subDepartmentId)
    this.deleteService.stateOpen$.next(true)
    this.deleteService.type$.next('subdepartmnet')
    this.deleteService.modalTitle$.next('Удалить подразделение')
    // const modal = document.getElementById('subDepartmentDelModal')
    // modal.style.display = 'block'
  }
  showEditModal(event) {
    console.log(event.target.parentElement)
    this.subDepartmentId = event.target.parentElement.dataset.subdepartmentId
    this.subDepartmentTitle = event.target.parentElement.dataset.title
    this.departmentTitle = event.target.parentElement.dataset.departmentTitle
    this.apiServiceService.departmentForEditModal$.next(this.departmentTitle)
    console.log(this.subDepartmentTitle)
    const modal = document.getElementById('subDepartmentEditModal')
    modal.style.display = 'block'
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    if (this.apiServiceService.departments) {
      this.apiServiceService.getDepartments()
    }


    const departmentsSub = this.apiServiceService.departments$.subscribe((dataFromApi) => {
      this.dataForModal = dataFromApi
      console.log(this.dataForModal)
    })
    this.subscription.add(departmentsSub)
  }


}
