import { Component, OnInit } from '@angular/core';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";
import { ApiServiceService } from "src/app/shared/api-service.service";
import { Input } from "@angular/core";
@Component({
  selector: 'app-members-edit-modal',
  templateUrl: './members-edit-modal.component.html',
  styleUrls: ['./members-edit-modal.component.scss']
})
export class MembersEditModalComponent implements OnInit {

  @Input() dataForModal: {}[] = []
  constructor(private structureRouting: StructuresRoutingService, private API: ApiServiceService) { }

  structureDropdown: boolean = false
  facultyDropdown: boolean = false
  faculty: string = 'Факультет'
  structure: string = 'Подразделение'
  structures: string[] = ['Сначала выберите факультет']

  name: string
  card: number
  subdepartmentID : number
  isStudent: boolean
  memberID: number

  ngOnInit(): void {

  }

  editMember(){
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    checkboxes.forEach(element => {
      if(element.checked){
        this.memberID = Number(element.value)
        console.log(typeof(this.memberID))
      }
    });
    this.API.editMember(this.name,this.card,this.subdepartmentID,this.isStudent,this.memberID)
  }

  selectFaculty(event){
    this.structures.length = 0
    this.faculty =  event.target.dataset.selectFaculty
    this.dropDownFaculty()
    this.dataForModal.forEach(element => {
      if (this.faculty == element.title) {
        element.sub_departments.forEach(item => {
          this.structures.push(item)
        });
      }
    })
  }
  selectStructure(event){
    this.structure =  event.target.dataset.selectStructure
    this.subdepartmentID = event.target.dataset.selectId
    this.dropDownStructure()
  }

  dropDownFaculty(){
    this.facultyDropdown = !this.facultyDropdown
  }
  dropDownStructure(){
    this.structureDropdown = !this.structureDropdown
  }
  closeModal(){
    const modal = document.getElementById('membersEditModal')
    modal.style.display = "none";
    this.faculty = 'Факультет'
  }
}
