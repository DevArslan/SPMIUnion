import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {


  @Input() data: {id: string, name: string, login: string, role: string, date: string}[]
  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
