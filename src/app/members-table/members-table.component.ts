import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";



@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss']
})
export class MembersTableComponent implements OnInit {

  @Input() data: {id: string, name: string, structure: string, status: string}[]
  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
  }



}
