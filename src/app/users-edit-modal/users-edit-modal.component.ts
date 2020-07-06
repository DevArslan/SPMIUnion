import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
@Component({
  selector: 'app-users-edit-modal',
  templateUrl: './users-edit-modal.component.html',
  styleUrls: ['./users-edit-modal.component.scss']
})
export class UsersEditModalComponent implements OnInit {
  @Input() roles: [] = []
  
  constructor(private api: ApiServiceService) { }
  
  roleDropdown: boolean = false
  roleLabel:string = 'Роль'
  roleID: number
  userID: number

  ngOnInit(): void {
  }
  async editUser(){
    const checkboxes = document.getElementsByClassName('userCheckbox')

    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      if(element.checked){
        this.userID = Number(element.value)
      }
    }

    await this.api.editUser(this.userID,this.roleID)
    await this.api.getUsers()
    this.closeModal()
  }
  closeModal(){
    const modal = document.getElementById('usersEditModal')
    modal.style.display = "none";
  }
  selectRole(event){
    this.roleLabel =  event.target.dataset.selectRole
    this.roleID = event.target.dataset.roleId
    this.dropDownRole()
  }
  dropDownRole(){
    this.roleDropdown = !this.roleDropdown
  }
}
