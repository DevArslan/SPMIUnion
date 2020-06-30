import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";
@Component({
  selector: 'app-users-add-modal',
  templateUrl: './users-add-modal.component.html',
  styleUrls: ['./users-add-modal.component.scss']
})
export class UsersAddModalComponent implements OnInit {
  @Input() roles: [] = []
  constructor(private apiServiceService: ApiServiceService) { }
  roleDropdown: boolean = false
  roleLabel: string = 'Выберите роль'

  username: string
  password: string
  login: string
  ngOnInit(): void {

  }
  createUser(){
    console.log('create')
    console.log(this.roles)
    this.apiServiceService.createUser(this.username, this.login, this.password)
  }
  closeModal(){
    const modal = document.getElementById('usersAddModal')
    modal.style.display = "none";
  }

  selectRole(event){
    this.roleLabel =  event.target.dataset.selectRole
    this.dropDownRole()
  }

  dropDownRole(){
    this.roleDropdown = !this.roleDropdown
  }

}
