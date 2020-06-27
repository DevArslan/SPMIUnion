import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";

@Component({
  selector: 'app-structures-card',
  templateUrl: './structures-card.component.html',
  styleUrls: ['./structures-card.component.scss']
})
export class StructuresCardComponent implements OnInit {

  constructor(private structureRouting: StructuresRoutingService) { }

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
  selectedDataStructures: string[] = []
  selectedDataStructuresUsers: number[] = []
  data: { faculty: string, name: string, users: string, structures: { structureName: string, structureUsers: number }[] }[]

  dropdown: boolean = false;

  updateCharts(structureChart, structureChart2) {
    // Обнуление массивов с данными подразделений
    this.selectedDataStructures.length = 0
    this.selectedDataStructuresUsers.length = 0
    console.log(this.selectedDataStructuresUsers)
    // Получение массивов с данным подразделений
    this.selectedData.structures.forEach(element => {
      this.selectedDataStructures.push(element.structureName)
      this.selectedDataStructuresUsers.push(element.structureUsers)
    });
    structureChart.update()
    structureChart2.update()
    console.log(this.selectedDataStructuresUsers)
  }

  ngOnInit(): void {
    // Подписка на меню навигации
    this.structureRouting.postData$.subscribe((faculty) => {
      this.data = this.structureRouting.data
      this.data.forEach(element => {
        if (faculty == element.faculty) {
          this.selectedData = element;
          this.updateCharts(structureChart, structureChart2)
        }
      })
    })

    var structureChart = new Chart('structureChart', {
      type: 'bar',
      data: {
        labels: [12, 19, 3, 5, 2, 3],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    var structureChart2 = new Chart('structureChart2', {
      type: 'pie',
      data: {
        labels: this.selectedDataStructures,
        datasets: [{
          label: '# of Votes',
          data: this.selectedDataStructuresUsers,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }



  dropdownStructureTable() {
    this.dropdown = !this.dropdown
  }

}
