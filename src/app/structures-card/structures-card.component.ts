import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";
import { ApiServiceService } from "src/app/shared/api-service.service";
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-structures-card',
  templateUrl: './structures-card.component.html',
  styleUrls: ['./structures-card.component.scss']
})
export class StructuresCardComponent implements OnInit {


  id: number;

  constructor(private structureRouting: StructuresRoutingService, private apiServiceService: ApiServiceService, private route: ActivatedRoute) {
    console.log(this.route)
    // this.routeSubscription = this.route.params.subscribe(params=>this.id=params['id']);
  }

  selectedData: any = ''
  selectedDataStructures: string[] = []
  selectedDataStructuresUsers: string[] = []
  data: {}[] = []
  subDepartmentsForCharts: {}[] = []
  subDepartments: { 'head_department_id': number }[]
  selectedSubDepartments: {}[] = []
  selectedSubDepartmentsIds: number[] = []
  structureNameInputDrop: boolean = false
  structureName: string
  proforgNameInputDrop: boolean = false
  proforgName: string

  dropdown: boolean = false;

  stats: any[] = []
  datesForDiagram: string[] = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
  currentValueForDiagram: number[] = []
  diagramData: {'01':number,'02':number,'03':number,'04':number,'05':number,'06':number,'07':number,'08':number,'09':number,'10':number,'11':number,'12':number} = {'01': 0 ,'02': 0,'03': 0,'04': 0,'05': 0,'06': 0,'07': 0,'08': 0,'09': 0,'10': 0,'11': 0,'12': 0}

  dynamics: {'subID':number, 'dynamic':number}[] = []
  // getStats(fromData,toData,subID){
  //   this.apiServiceService.getStats(fromData,toData,subID)
  // }

  getDynamic(subID){
    let nowMonth = (new Date()).getMonth()+1
    let prevMonth = (new Date()).getMonth()
    
    let dynamic = 0
    if(nowMonth == 1){
      prevMonth = 12
    }
    
    let valueNowMonth = 0
    let valuePrevMonth = 0

    this.stats.forEach((item)=>{
      if(subID == item.subdepartment_id){
        if(item.date_time.slice(3,5) == prevMonth){
          valuePrevMonth = item.current_total
        }
        if(item.date_time.slice(3,5) == nowMonth){
          valueNowMonth = item.current_total
        }
      }
    })

    dynamic = valueNowMonth - valuePrevMonth
    
    this.dynamics.push({'subID':subID, 'dynamic':dynamic})
    console.log(this.dynamics)
  }

  saveStructureName() {
    this.apiServiceService.editStructure(this.structureName, this.selectedData.proforg, this.selectedData.id)
    this.showEditStructureNameForm()
  }
  saveProforgName() {
    this.apiServiceService.editStructure(this.selectedData.title, this.proforgName, this.selectedData.id)
    this.showEditProforgNameForm()
  }
  showEditStructureNameForm() {
    this.structureNameInputDrop = !this.structureNameInputDrop
  }
  showEditProforgNameForm() {
    this.proforgNameInputDrop = !this.proforgNameInputDrop
  }

  showAddModal() {
    const modal = document.getElementById('subDepartmentAddModal')
    modal.style.display = 'block'
  }
  showDelModal() {
    const modal = document.getElementById('departmentDelModal')
    modal.style.display = 'block'
  }

  updateCharts(structureChart, structureChart2) {
    
    // Обнуление массивов с данными подразделений
    this.selectedDataStructures.length = 0
    this.selectedDataStructuresUsers.length = 0

    // this.datesForDiagram.length = 0
    this.currentValueForDiagram.length = 0
    this.diagramData = {'01': 0 ,'02': 0,'03': 0,'04': 0,'05': 0,'06': 0,'07': 0,'08': 0,'09': 0,'10': 0,'11': 0,'12': 0}
    // Получение массивов с данным подразделений
    this.selectedSubDepartments.forEach((element: any) => {
      this.selectedDataStructures.push(element.title)
      this.selectedDataStructuresUsers.push(element.members_total)
    });

    for (let index = 0; index < this.stats.length; index++) {

      // this.datesForDiagram.push(this.stats[index].date_time)
      // this.currentValueForDiagram.push(this.stats[index].current_total)

      for (const key in this.diagramData) {
        let month = this.stats[index].date_time.slice(3,5)
  
        if(month == key){
          this.diagramData[key] = (this.stats[index].current_total)
        }
      }  
    }
    let index = -2
    for (const key in this.diagramData) {
      this.currentValueForDiagram[index] = this.diagramData[key]
      index +=1
    }
    
    structureChart.update()
    structureChart2.update()

  }
  // Форматирование даты в следующий вид: YYY-MM-DD
  formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return yy + '-' + mm + '-' + dd;
  }

  dropdownStructureTable() {
    this.dropdown = !this.dropdown
  }

  async getDepartmentDataById(id) {
    return await this.apiServiceService.getDepartmentById(id);
  }
  async getSubDepartmentsData() {
    return await this.apiServiceService.getSubDepartments();
  }

  async getStats(nowDateMinusOneYear, nowDate, subID) {
    this.apiServiceService.getStats(nowDateMinusOneYear, nowDate, subID)
    this.apiServiceService.stats$.subscribe(() => {
      this.stats = this.apiServiceService.stats.stats
    })
  }



  ngOnInit(): void {
    // Подписка для того, чтобы дождаться загрузки данных о структурах. Иначе при обновлении страницы, она будет пустой (данные еще не будут подгружены с backend-а)
    this.apiServiceService.departments$.subscribe(() => {
      // Подписка на изменение параметров (id) в маршруте
      this.route.params.subscribe(async(params) => {
        this.dynamics.length = 0
        this.subDepartmentsForCharts.length = 0
        this.selectedSubDepartments.length = 0

        this.data = this.apiServiceService.departments
        
        this.data.forEach(async (element: any) => {
          if (params.id == element.id) {
            this.selectedData = element;
            // Фильтрация подразделения под конкретную структуру
            this.subDepartments = (await this.getSubDepartmentsData()).subdepartments

            this.subDepartments.forEach((element: any) => {
              if (element.head_department_id == this.selectedData.id) {
                this.selectedSubDepartments.push(element)
              }
            });

            this.selectedSubDepartmentsIds.length = 0
            this.selectedSubDepartments.forEach((element: any) => {
              this.selectedSubDepartmentsIds.push(element.id)
              
            });
            console.log(this.selectedSubDepartmentsIds)

            const nowDate = this.formatDate(new Date())
            const nowDateMinusOneYear = (Number(new Date().getFullYear()) - 1) + this.formatDate(new Date()).slice(4)
            await this.getStats(nowDateMinusOneYear, nowDate, this.selectedSubDepartmentsIds)
            this.apiServiceService.stats$.subscribe(()=>{
              this.selectedSubDepartmentsIds.forEach((id)=>{
                this.getDynamic(id)
              })
              
              this.updateCharts(structureChart, structureChart2)

              
            })
            
          }
        })
        
       
      })
    })

    var structureChart = new Chart('structureChart', {
      type: 'bar',
      data: {
        labels: this.datesForDiagram,
        datasets: [{
          label: 'Диаграмма участников',
          data: this.currentValueForDiagram,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
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
