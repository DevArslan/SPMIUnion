import { Component, OnInit } from '@angular/core';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";
import { ApiServiceService } from "src/app/shared/api-service.service";

@Component({
  selector: 'app-structures-nav',
  templateUrl: './structures-nav.component.html',
  styleUrls: ['./structures-nav.component.scss']
})
export class StructuresNavComponent implements OnInit {

  constructor(private structureRouting: StructuresRoutingService,private apiServiceService: ApiServiceService) {}
  faculty: string = ''
  structureName: string = ''
  departmentsTitle: string[] = []
  departmentsData: {}[] = []

  selectStructure(event) {
    this.faculty =  event.target.dataset.selectNumber
    // this.apiServiceService.selectedDepartment = this.departmentsData[0].head_department_id
    // console.log(this.apiServiceService.selectedDepartment)
    this.structureRouting.postData$.next(this.faculty);

  }
  ngOnInit(): void {

    this.apiServiceService.departments$.subscribe(() =>{
      this.departmentsData =  this.apiServiceService.departments
      this.departmentsData.forEach(element => {
        this.departmentsTitle.push(element.title)
    })
  })




  }
}
