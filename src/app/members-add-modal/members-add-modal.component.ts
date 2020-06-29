import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";

@Component({
  selector: 'app-members-add-modal',
  templateUrl: './members-add-modal.component.html',
  styleUrls: ['./members-add-modal.component.scss']
})
export class MembersAddModalComponent implements OnInit {

  @Input() dataForModal: {}[] = []
  constructor(private apiServiceService: ApiServiceService) { }

  structureDropdown: boolean = false
  facultyDropdown: boolean = false
  faculty: string = 'Факультет'
  structure: string = 'Подразделение'
  structures: string[] = ['Сначала выберите факультет']

  name: string
  card: string
  subdepartmentID : number
  isStudent: boolean


  ngOnInit(): void {

  }

  createMember(){
    this.apiServiceService.createMember(this.name,this.card,this.subdepartmentID,this.isStudent)
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

  closeModal(){
    const modal = document.getElementById('membersAddModal')
    modal.style.display = "none";
    this.faculty = 'Факультет'
  }

  dropDownFaculty(){
    this.facultyDropdown = !this.facultyDropdown
  }
  dropDownStructure(){
    this.structureDropdown = !this.structureDropdown
  }

}
