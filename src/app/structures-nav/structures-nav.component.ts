import { Component, OnInit } from '@angular/core';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";

@Component({
  selector: 'app-structures-nav',
  templateUrl: './structures-nav.component.html',
  styleUrls: ['./structures-nav.component.scss']
})
export class StructuresNavComponent implements OnInit {

  constructor(private structureRouting: StructuresRoutingService) {}
  faculty: string = ''
  // selectStructure(event) {
  //   this.structureRouting.selectStructureService(event)
  // }

  selectStructure(event) {
    this.faculty =  event.target.dataset.selectNumber
    this.structureRouting.postData$.next(this.faculty);
    console.log(this.faculty)
  }
  ngOnInit(): void {
  }
  structureName: string = ''
  faculties: string[] = ['Геологоразведочный факультет', 'Горный факультет', 'Механико-машиностроительный факультет', 'Нефтегазовый факультет', 'Факультет переработки минерального сырья']



}
