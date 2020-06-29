import { Component, OnInit } from '@angular/core';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";
import { Input } from "@angular/core";

@Component({
  selector: 'app-structures-table',
  templateUrl: './structures-table.component.html',
  styleUrls: ['./structures-table.component.scss']
})
export class StructuresTableComponent implements OnInit {
  @Input() subDepartments: {}[]
  // data: {id: string, name: string, structure: string, users: string, dynamic: string}[] = [
  //   {'id':'1', 'name':'Кафедра разработки месторождений полезных ископаемых','structure':'Горный факультет','users':'12','dynamic':'+12'},
  //   {'id':'2', 'name':'Кафедра безопасности производств','structure':'Горный факультет','users':'53','dynamic':'+12'},
  //   {'id':'3', 'name':'Кафедра взрывного дела','structure':'Горный факультет','users':'22','dynamic':'+12'},
  //   {'id':'4', 'name':'Кафедра геоэкологии','structure':'Горный факультет','users':'11','dynamic':'+12'}
  // ]
  data: { faculty: string, name: string, users: string, structures: { structureName: string, structureUsers: number }[] }[]
  selectedData: { faculty: string, name: string, users: string, structures: { structureName: string, structureUsers: number }[] } = {
    'faculty': 'Геологоразведочный факультет', 'name': 'Ivan', 'users': '212', 'structures': [
      { 'structureName': 'Кафедра геофизических и геохимических методов поисков и разведки месторождений полезных ископаемых', 'structureUsers': 11 },
      { 'structureName': 'Кафедра геологии и разведки месторождений полезных ископаемых', 'structureUsers': 21 },
      { 'structureName': 'Кафедра минералогии, кристаллографии и петрографии', 'structureUsers': 11 },
      { 'structureName': 'Кафедра исторической и динамической геологии', 'structureUsers': 3 },
      { 'structureName': 'Кафедра гидрогеологии и инженерной геологии', 'structureUsers': 1 },
      { 'structureName': 'Кафедра геологии нефти и газа', 'structureUsers': 14 },
    ]
  }

  constructor(private structureRouting: StructuresRoutingService) {}

  ngOnInit(): void {

    this.structureRouting.postData$.subscribe((faculty) => {
      this.data = this.structureRouting.data
      this.data.forEach(element => {
        if (faculty == element.faculty) {
          this.selectedData = element;
        }
      })
    })


  }


}
