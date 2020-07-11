import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { of } from 'rxjs';
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
  users: any

  error:string = ''
  ngOnInit(): void {
    this.api.users$.subscribe((dataFromApi: any) => {
      this.users = dataFromApi.users
      this.api.selectedUserId$.subscribe(()=>{
        this.userID =  this.api.selectedUserId$.getValue()
        this.users.forEach((user):any => {
          if(user.id == this.userID){
            this.roleLabel = user.role
          }  
        });
      })
    })
    
  }

  async editUser(){


    const promise = await this.api.editUser(this.userID,this.roleID)
    if(promise.error){
      this.error = promise.message
    }else{
      await this.api.getUsers()
      this.closeModal()
    }
    this.roleLabel = 'Роль'
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
