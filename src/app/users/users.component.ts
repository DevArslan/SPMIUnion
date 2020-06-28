import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }

  data: {id: string, name: string, login: string, role: string, date: string}[] = [
    {'id':'1', 'name':'Ivan','login':'petya','role':'admin','date':'20.06.2020'},
    {'id':'2', 'name':'Ivan','login':'vanya','role':'admin','date':'21.06.2020'},
    {'id':'3', 'name':'Ivan','login':'oleg','role':'admin','date':'06.06.2020'},
    {'id':'4', 'name':'Petya','login':'vasya','role':'admin','date':'11.06.2020'}
  ]

  ngOnInit(): void {
  }

}
