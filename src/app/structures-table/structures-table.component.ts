import { Component, OnInit } from '@angular/core';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";
@Component({
  selector: 'app-structures-table',
  templateUrl: './structures-table.component.html',
  styleUrls: ['./structures-table.component.scss']
})
export class StructuresTableComponent implements OnInit {
  @Input() selectedSubDepartments: {}[]
  @Input() dynamics: {'subID':number, 'dynamic':number}[]
  subDepartmentId: number
  data: {}[]
  dataForModal: {}[] = []
  currentSubDynamic: number
  constructor(private structureRouting: StructuresRoutingService,private apiServiceService: ApiServiceService) {}
  
  getDynamic(id){
    
    this.dynamics.forEach((item)=>{
      if(id == item.subID){
        this.currentSubDynamic =  item.dynamic
      }
    })
  }

  showDelModal(event){
    console.log(event.target.parentElement)
    this.subDepartmentId =  event.target.parentElement.dataset.subdepartmentId
    const modal = document.getElementById('subDepartmentDelModal')
    modal.style.display = 'block'
  }
  showEditModal(event){
    console.log(event.target.parentElement)
    this.subDepartmentId =  event.target.parentElement.dataset.subdepartmentId
    const modal = document.getElementById('subDepartmentEditModal')
    modal.style.display = 'block'
  }

  ngOnInit(): void {
    // this.selectedSubDepartments.forEach((item)=>{
    //   item.stats = 
    // })
    console.log(this.dynamics)
    this.apiServiceService.getDepartments()
    this.apiServiceService.departments$.subscribe((dataFromApi) => {
      this.dataForModal = dataFromApi
    })
  }


}
