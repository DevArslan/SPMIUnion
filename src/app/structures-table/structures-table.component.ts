import { Component, OnInit } from '@angular/core';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";
import { Input } from "@angular/core";

@Component({
  selector: 'app-structures-table',
  templateUrl: './structures-table.component.html',
  styleUrls: ['./structures-table.component.scss']
})
export class StructuresTableComponent implements OnInit {
  @Input() selectedSubDepartments: {}[]
  subDepartmentId: number
  data: {}[]

  constructor(private structureRouting: StructuresRoutingService) {}

  showDelModal(event){
    console.log(event.target.parentElement)
    this.subDepartmentId =  event.target.parentElement.dataset.subdepartmentId
    const modal = document.getElementById('subDepartmentDelModal')
    modal.style.display = 'block'
  }

  ngOnInit(): void {
    console.log(this.selectedSubDepartments)
  }


}
