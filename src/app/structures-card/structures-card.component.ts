import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";
import { ApiServiceService } from "src/app/shared/api-service.service";
@Component({
  selector: 'app-structures-card',
  templateUrl: './structures-card.component.html',
  styleUrls: ['./structures-card.component.scss']
})
export class StructuresCardComponent implements OnInit {

  constructor(private structureRouting: StructuresRoutingService, private apiServiceService: ApiServiceService) { }

  selectedData: {} = {}
  selectedDataStructures: string[] = []
  selectedDataStructuresUsers: string[] = []
  data: {}[] = []
  subDepartmentsForCharts: {}[] = []
  subDepartments: {}
  selectedSubDepartments: {}[] = []

  dropdown: boolean = false;

  showAddModal(){
    const modal = document.getElementById('subDepartmentAddModal')
    modal.style.display = 'block'
  }

  updateCharts(structureChart, structureChart2) {
    // Обнуление массивов с данными подразделений
    this.selectedDataStructures.length = 0
    this.selectedDataStructuresUsers.length = 0

    // Получение массивов с данным подразделений
    this.selectedSubDepartments.forEach(element => {
      this.selectedDataStructures.push(element.title)
      this.selectedDataStructuresUsers.push(element.members_total)
    });
    structureChart.update()
    structureChart2.update()

  }

  dropdownStructureTable() {
    this.dropdown = !this.dropdown
  }

  async getDepartmentDataById(id){
    return await this.apiServiceService.getDepartmentById(id);
  }
  async getSubDepartmentsData(){
    return await this.apiServiceService.getSubDepartments();
  }

  ngOnChanges(): void{

  }

  ngOnInit(): void {

    // Подписка на меню навигации
    this.structureRouting.postData$.subscribe((faculty) => {
      this.subDepartmentsForCharts.length = 0
      this.selectedSubDepartments.length = 0
      this.data = this.apiServiceService.departments
      this.data.forEach(async(element) => {
        if (faculty == element.title) {
          this.selectedData = element;
          console.log(this.selectedData)
          // Фильтрация подразделения под конкретную структуру
          this.subDepartments = await this.getSubDepartmentsData()
          this.subDepartments.subdepartments.forEach(element => {
            if(element.head_department_id == this.selectedData.id){
              this.selectedSubDepartments.push(element)
            }
          });
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
          data: [12, 19, 3, 5, -2, 3],
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

    });
  }





}
