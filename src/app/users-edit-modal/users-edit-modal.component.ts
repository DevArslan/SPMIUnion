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
      this.api.selectedUserId$.subscribe((data)=>{
        this.userID =  data
        if (this.userID) {
          this.error = ''
        } else {
          this.error = 'Сначала выберите участников'
        }
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
      this.api.error.next(String(this.error))
    }else{
      this.api.selectedUserId$.next(undefined)
      await this.api.getUsers()
      this.api.responseOK.next('Пользователь успешно изменен')
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
