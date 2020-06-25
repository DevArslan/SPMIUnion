import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-structures-table',
  templateUrl: './structures-table.component.html',
  styleUrls: ['./structures-table.component.scss']
})
export class StructuresTableComponent implements OnInit {

  data: {id: string, name: string, structure: string, users: string, dynamic: string}[] = [
    {'id':'1', 'name':'Кафедра разработки месторождений полезных ископаемых','structure':'Горный факультет','users':'12','dynamic':'+12'},
    {'id':'2', 'name':'Кафедра безопасности производств','structure':'Горный факультет','users':'53','dynamic':'+12'},
    {'id':'3', 'name':'Кафедра взрывного дела','structure':'Горный факультет','users':'22','dynamic':'+12'},
    {'id':'4', 'name':'Кафедра геоэкологии','structure':'Горный факультет','users':'11','dynamic':'+12'}
  ]

  constructor() { }

  ngOnInit(): void {
  }


}
