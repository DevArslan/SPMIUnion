import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";
import { ApiServiceService } from "src/app/shared/api-service.service";
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-structures-card',
  templateUrl: './structures-card.component.html',
  styleUrls: ['./structures-card.component.scss']
})
export class StructuresCardComponent implements OnInit {


  id: number;

  constructor(private ROUTER: Router, private apiServiceService: ApiServiceService, private route: ActivatedRoute) {
    console.log(this.route)
    // this.routeSubscription = this.route.params.subscribe(params=>this.id=params['id']);
  }

  selectedData: any = {}
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
  titleLength: string
  proforgNameLength: string
  emptyArray: [] = []
  dropdown: boolean = false;

  stats: any[] = []
  datesForDiagram: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  currentValueForDiagram: number[] = []
  diagramData: { '01': number, '02': number, '03': number, '04': number, '05': number, '06': number, '07': number, '08': number, '09': number, '10': number, '11': number, '12': number } = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }

  dynamics: { 'subID': number, 'dynamic': number }[] = []
  equalID: boolean = false



  getDynamic(subID) {
    let nowMonth = (new Date()).getMonth() + 1
    let prevMonth = (new Date()).getMonth()

    let dynamic = 0
    if (nowMonth == 1) {
      prevMonth = 12
    }

    let valueNowMonth = 0
    let valuePrevMonth = 0

    this.stats.forEach((item) => {
      if (subID == item.subdepartment_id) {
        if (item.date_time.slice(3, 5) == prevMonth) {
          valuePrevMonth = item.current_total
        }
        if (item.date_time.slice(3, 5) == nowMonth) {
          valueNowMonth = item.current_total
        }
      }
    })

    dynamic = valueNowMonth - valuePrevMonth

    this.dynamics.push({ 'subID': subID, 'dynamic': dynamic })
  }

  async saveStructureName() {
    const structureName = <HTMLInputElement>document.getElementById('structureName')
    const structureNameP = document.getElementById('structureNameP')
    if (this.structureName) {
      this.selectedData.title = this.structureName
      this.titleLength = String(structureName.value.length)
      structureName.setAttribute('readonly', '')
      structureName.setAttribute('size', String(Number(this.titleLength) * 1.05))
      structureName.blur()
      const promise = await this.apiServiceService.editStructure(this.structureName, this.selectedData.proforg, this.selectedData.id)
      if (promise.error) {
        let error = promise.message
        this.apiServiceService.error.next(String(error))
      } else {
        this.apiServiceService.responseOK.next('Название успешно изменено')
      }
      structureNameP.style.display = 'block'
      structureName.style.display = 'none'
    } else {
      structureNameP.style.display = 'block'
      structureName.style.display = 'none'
    }


  }
  async saveProforgName() {
    const proforgName = <HTMLInputElement>document.getElementById('proforgName')
    const proforgNameP = document.getElementById('proforgNameP')
    if (this.proforgName) {
      this.selectedData.proforg = this.proforgName
      this.proforgNameLength = String(proforgName.value.length)
      proforgName.setAttribute('readonly', '')
      proforgName.setAttribute('size', String(Number(this.proforgNameLength) * 1.05))
      proforgName.blur()
      const promise = await this.apiServiceService.editStructure(this.selectedData.title, this.proforgName, this.selectedData.id)

      if (promise.error) {
        let error = promise.message
        this.apiServiceService.error.next(String(error))

      } else {
        this.apiServiceService.responseOK.next('ФИО профорга успешно изменено')
      }
      proforgNameP.style.display = 'block'
      proforgName.style.display = 'none'
    } else {
      proforgNameP.style.display = 'block'
      proforgName.style.display = 'none'
    }


  }
  // showEditStructureNameForm() {
  //   this.structureNameInputDrop = !this.structureNameInputDrop
  // }
  showEditStructureNameForm() {
    const structureNameP = document.getElementById('structureNameP')
    const structureName = <HTMLInputElement>document.getElementById('structureName')
    structureNameP.style.display = 'none'
    structureName.style.display = 'block'
    structureName.removeAttribute('readonly')
    structureName.focus()
  }
  showEditProforgNameForm() {
    const proforgNameP = document.getElementById('proforgNameP')
    const proforgName = document.getElementById('proforgName')
    proforgNameP.style.display = 'none'
    proforgName.style.display = 'block'
    proforgName.removeAttribute('readonly')
    proforgName.focus()
  }
  // showEditProforgNameForm() {
  //   this.proforgNameInputDrop = !this.proforgNameInputDrop
  // }

  showAddModal() {
    const modal = document.getElementById('subDepartmentAddModal')
    modal.style.display = 'block'
  }
  showDelModal() {
    const modal = document.getElementById('departmentDelModal')
    modal.style.display = 'block'
  }

  sortBySubID(arr) {
    return arr.sort((a, b) => a.subdepartment_id > b.subdepartment_id ? 1 : -1);
  }


  updateCharts(structureChart, structureChart2) {

    // Обнуление массивов с данными подразделений
    this.selectedDataStructures.length = 0
    this.selectedDataStructuresUsers.length = 0

    // this.datesForDiagram.length = 0
    this.currentValueForDiagram.length = 0
    this.diagramData = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
    // Получение массивов с данным подразделений
    this.selectedSubDepartments.forEach((element: any) => {
      this.selectedDataStructures.push(element.title)
      this.selectedDataStructuresUsers.push(element.members_total)
    });
    // !!! Поменять переменную, все работает без сортировки
    let sortedByIdStats = this.stats

    if (this.stats.length != 0) {
      if (sortedByIdStats.length != 1) {
        for (let index = 1; index < sortedByIdStats.length; index++) {

          for (const key in this.diagramData) {
            let month = sortedByIdStats[index].date_time.slice(3, 5)
            if (sortedByIdStats[index].subdepartment_id != sortedByIdStats[index - 1].subdepartment_id) {

              if (month == key) {

                this.diagramData[key] += (sortedByIdStats[index - 1].current_total)

              }
            }
            if (index == sortedByIdStats.length - 1) {

              if (month == key) {

                this.diagramData[key] += (sortedByIdStats[index].current_total)

              }
            }
          }

        }
      } else {

        for (const key in this.diagramData) {
          let month = sortedByIdStats[0].date_time.slice(3, 5)
          if (month == key) {
            this.diagramData[key] += (sortedByIdStats[0].current_total)
          }
        }

      }
    } else {
      this.diagramData = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
    }


    let index = 0
    for (const key in this.diagramData) {
      // Такое заполнение массива, потому что js не итерирует объекты последовательно (это хоть какое-то решение)
      this.currentValueForDiagram[Number(key)] = this.diagramData[key]

    }
    // Удаление первого пустого элемента массива, иначе перескакивает на один месяц вперед. 
    this.currentValueForDiagram.shift()

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

    return dd + '-' + mm + '-' + yy;
  }

  dropdownStructureTable() {
    this.dropdown = !this.dropdown
  }
  downloadExcel() {
    console.log(this.selectedData.id)
    this.apiServiceService.downloadExcelDepartment(this.selectedData.id, this.selectedData.title)
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
      this.route.params.subscribe(async (params) => {
        this.dynamics.length = 0
        this.subDepartmentsForCharts.length = 0
        this.selectedSubDepartments.length = 0

        this.data = this.apiServiceService.departments

        this.data.forEach(async (element: any) => {
          if (params.id == element.id) {
            this.equalID = true
            this.selectedData = element;
            try {
              this.titleLength = String(this.selectedData.title.length * 20)
              const structureName = <HTMLInputElement>document.getElementById('structureName')
              structureName.style.width = this.titleLength + 'px'
              // structureName.setAttribute('size', this.titleLength)
            } catch (error) {

            }
            try {
              this.proforgNameLength = String(this.selectedData.proforg.length * 20)
              const proforgName = document.getElementById('proforgName')
              proforgName.setAttribute('size', this.proforgNameLength)
            } catch (error) {

            }




            // Фильтрация подразделения под конкретную структуру
            this.subDepartments = (await this.getSubDepartmentsData()).subdepartments

            this.selectedSubDepartments.length = 0
            this.subDepartments.forEach((element: any) => {
              if (element.head_department_id == this.selectedData.id) {
                this.selectedSubDepartments.push(element)
              }
            });
            console.log(this.selectedSubDepartments)
            this.selectedSubDepartmentsIds.length = 0
            this.selectedSubDepartments.forEach((element: any) => {
              this.selectedSubDepartmentsIds.push(element.id)

            });

            const nowDate = this.formatDate(new Date())
            const nowDateMinusOneYear = (this.formatDate(new Date()).slice(0, -4)) + Number(new Date().getFullYear() - 1)
            await this.getStats(nowDateMinusOneYear, nowDate, this.selectedSubDepartmentsIds)


            this.apiServiceService.stats$.subscribe(() => {
              this.selectedSubDepartmentsIds.forEach((id) => {
                this.getDynamic(id)
              })
              this.updateCharts(structureChart, structureChart2)
            })
          }
        })


      })
      if (this.equalID == true) {

      } else {
        this.ROUTER.navigate(['main/members']);
        this.equalID = true
      }
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
