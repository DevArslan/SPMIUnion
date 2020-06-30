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

  data: {}[] = []
  dataForModal: {}[] = []

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

  // getMembersData() {
  //   return this.apiServiceService.getMembers()
  // }

  ngOnInit(): void {
    this.apiServiceService.getMembers()
    this.apiServiceService.members$.subscribe((dataFromApi) => {
      this.data = dataFromApi.members
    })

    this.apiServiceService.getDepartments()
    this.apiServiceService.departments$.subscribe((dataFromApi) => {
      this.dataForModal = dataFromApi
    })




  }


}
