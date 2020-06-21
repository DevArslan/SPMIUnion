import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-structures-nav',
  templateUrl: './structures-nav.component.html',
  styleUrls: ['./structures-nav.component.scss']
})
export class StructuresNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  structureName: string = ''
  faculties: string[] = ['Геологоразведочный факультет', 'Горный факультет', 'Механико-машиностроительный факультет', 'Нефтегазовый факультет', 'Факультет переработки минерального сырья']
}
