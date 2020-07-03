import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService) { }
  roles: {}
  users: any
  username: string = ''



  ngOnInit(): void {
    this.apiServiceService.getRoles()
    this.apiServiceService.roles$.subscribe((dataFromApi: any) => {
      this.roles = dataFromApi.roles

    })

    this.apiServiceService.getUsers()
    this.apiServiceService.users$.subscribe((dataFromApi: any) => {
      this.users = dataFromApi.users
      console.log(this.users)
    })


  }

  showAddModal() {
    const modal = document.getElementById('usersAddModal')
    modal.style.display = "block";
  }
  showEditModal() {
    const modal = document.getElementById('usersEditModal')
    modal.style.display = "block";
  }
  showDelModal() {
    const modal = document.getElementById('usersDelModal')
    modal.style.display = "block";
  }
  

}
