import { Component, OnInit } from '@angular/core';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";

@Component({
  selector: 'app-members-add-modal',
  templateUrl: './members-add-modal.component.html',
  styleUrls: ['./members-add-modal.component.scss']
})
export class MembersAddModalComponent implements OnInit {

  constructor(private structureRouting: StructuresRoutingService) { }

  structureDropdown: boolean = false
  facultyDropdown: boolean = false
  faculty: string = 'Факультет'
  structure: string = 'Подразделение'
  faculties: string[] = ['Геологоразведочный факультет', 'Горный факультет', 'Механико-машиностроительный факультет', 'Нефтегазовый факультет', 'Факультет переработки минерального сырья']

  data: { faculty: string, name: string, users: string, structures: { structureName: string, structureUsers: number }[] }[]
  structures: string[] = ['Сначала выберите факультет']

  ngOnInit(): void {
    this.data = this.structureRouting.data
  }
  selectFaculty(event){
    this.structures.length = 0
    this.faculty =  event.target.dataset.selectFaculty
    this.dropDownFaculty()
    this.data.forEach(element => {
      if (this.faculty == element.faculty) {
        element.structures.forEach(item => {
          this.structures.push(item.structureName)
        });
      }
    })
  }
  selectStructure(event){
    this.structure =  event.target.dataset.selectStructure
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
