import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { async } from '@angular/core/testing';
import { of } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService) { }

  username: string = ''
  membersID: number[] = []
  data: {}[] = []
  dataForModal: {}[] = []

  downloadExcel(){
    this.apiServiceService.downloadExcel()
  }
  blockMember(){
    this.membersID.length = 0
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      if(element.checked){
        this.membersID.push(Number(element.value))
      }
    }
    console.log(this.membersID)
    this.apiServiceService.blockMembers(this.membersID)
  }
  activateMember(){
    this.membersID.length = 0
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      if(element.checked){
        this.membersID.push(Number(element.value))
      }
    }
    console.log(this.membersID)
    this.apiServiceService.activateMembers(this.membersID)
  }

  showAddModal() {
    const modal = document.getElementById('membersAddModal')
    modal.style.display = "block";
  }
  showEditModal() {
    const modal = document.getElementById('membersEditModal')
    modal.style.display = "block";
  }
  showDelModal() {
    const modal = document.getElementById('membersDelModal')
    modal.style.display = "block";
  }

  
  ngOnInit(): void {
    this.apiServiceService.getMembers()
    this.apiServiceService.members$.subscribe((dataFromApi: any) => {
      this.data = dataFromApi.members
      console.log(this.data)
    })

    this.apiServiceService.getDepartments()
    this.apiServiceService.departments$.subscribe((dataFromApi) => {
      this.dataForModal = dataFromApi
    })


  }


}
