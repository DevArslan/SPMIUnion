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
  users: {}[]
  username: string = ''

  data: {id: string, name: string, login: string, role: string, date: string}[] = [
    {'id':'1', 'name':'Ivan','login':'petya','role':'admin','date':'20.06.2020'},
    {'id':'2', 'name':'Ivan','login':'vanya','role':'admin','date':'21.06.2020'},
    {'id':'3', 'name':'Ivan','login':'oleg','role':'admin','date':'06.06.2020'},
    {'id':'4', 'name':'Petya','login':'vasya','role':'admin','date':'11.06.2020'}
  ]

  ngOnInit(): void {
    this.apiServiceService.getRoles()
    this.apiServiceService.roles$.subscribe((dataFromApi) => {
      this.roles = dataFromApi.roles
      console.log(this.roles)
    })

    this.apiServiceService.getUsers()
    this.apiServiceService.users$.subscribe((dataFromApi) => {
      this.users = dataFromApi.users
      console.log(this.users)
    })


  }

  showAddModal() {
    const modal = document.getElementById('usersAddModal')
    modal.style.display = "block";
  }

}
