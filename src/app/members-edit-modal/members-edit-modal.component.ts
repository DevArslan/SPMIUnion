import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";
import { ApiServiceService } from "src/app/shared/api-service.service";
import { Input } from "@angular/core";
import { of } from 'rxjs';
@Component({
  selector: 'app-members-edit-modal',
  templateUrl: './members-edit-modal.component.html',
  styleUrls: ['./members-edit-modal.component.scss']
})
export class MembersEditModalComponent implements OnInit {

  @Input() dataForModal: {}[] = []
  @Input() data:{}[] = []
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
  
  error: string = ''

  @Output() childEvent = new EventEmitter();
  ngOnInit(): void {
    this.API.selectedMemberId$.subscribe((id)=>{
      this.memberID = id
      this.data.forEach((element: any)=> {
        if(element.id == this.memberID){
          console.log(element.name)
          this.name = element.name 
          console.log(this.name)
          this.card = element.card 
          this.structure = element.subdepartment
        }
      });
    })
  }

  async editMember(){


    const promise = await this.API.editMember(this.name,this.card,this.subdepartmentID,this.isStudent,this.memberID)
      if(promise.error){
        this.error = promise.message
      }else{
        this.childEvent.emit();
        this.closeModal()
      }
  }

  selectFaculty(event){
    this.structures.length = 0
    this.faculty =  event.target.dataset.selectFaculty
    this.dropDownFaculty()
    this.dataForModal.forEach((element: any) => {
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
