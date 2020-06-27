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

  selectedData: { faculty: string, name: string, users: string, status: string } = {'faculty':'Геологоразведочный факультет', 'name':'Ivan','users':'Gorniy','status':'admin'}
  data: { faculty: string, name: string, users: string, status: string }[] = [
    { 'faculty': 'Геологоразведочный факультет', 'name': 'Иванов', 'users': '12', 'status': 'admin' },
    { 'faculty': 'Горный факультет', 'name': 'Петров', 'users': '32', 'status': 'admin' },
    { 'faculty': 'Механико-машиностроительный факультет', 'name': 'Сидоров', 'users': '17', 'status': 'admin' },
    { 'faculty': 'Нефтегазовый факультет', 'name': 'Иванов', 'users': '92', 'status': 'admin' },
    { 'faculty': 'Факультет переработки минерального сырья', 'name': 'Петров', 'users': '132', 'status': 'admin' }
  ]

  dropdown: boolean = false;

  ngOnInit(): void {
    this.structureRouting.postData$.subscribe((faculty) => {
      this.data.forEach(element => {
        if (faculty == element.faculty) {
          this.selectedData = element;
        }
      })
    })

    var structureChart = new Chart('structureChart', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
  }

  dropdownStructureTable() {
    this.dropdown = !this.dropdown
  }

}
