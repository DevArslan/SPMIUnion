import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';
import { ApiService } from "src/app/shared/api.service";
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { DeleteService } from "../../../shared/delete.service";
import { ModalService } from '../../structures/subdepartments/shared/modal.service';
@Component({
  selector: 'app-structures-card',
  templateUrl: './structures-card.component.html',
  styleUrls: ['./structures-card.component.scss']
})
export class StructuresCardComponent implements OnInit {

  @ViewChild('structureNameTextarea') structureNameTextarea: ElementRef;
  @ViewChild('structureNameP') structureNameP: ElementRef;
  @ViewChild('structureNameP') proforgNameTextarea: ElementRef;
  @ViewChild('structureNameP') proforgNameP: ElementRef;
  id: number;

  constructor(private ROUTER: Router, private apiServiceService: ApiService, private route: ActivatedRoute, private deleteService: DeleteService, private modalService: ModalService) {

    // this.routeSubscription = this.route.params.subscribe(params=>this.id=params['id']);
  }
  private subscription: Subscription = new Subscription();
  selectedStructureId: number
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
  notEditStructureName: string = ''
  notEditProforgName: string = ''

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
    const structureName = this.structureNameTextarea.nativeElement
    const structureNameP = this.structureNameP.nativeElement
    if (this.structureName) {

      this.titleLength = String(structureName.value.length)
      structureName.setAttribute('readonly', '')
      structureName.setAttribute('size', String(Number(this.titleLength) * 1.05))
      structureName.blur()
      await this.apiServiceService.editStructure(this.structureName, this.proforgName, this.selectedData.id)

      this.apiServiceService.structure$.subscribe((data) => {
        if (data.error) {
          let error = data.error.message
          this.apiServiceService.error.next(String(error))
          this.selectedData.title = this.notEditStructureName
          this.structureName = this.notEditStructureName
        } else {

          this.apiServiceService.responseOK.next('Название структуры успешно изменено')
        }
      })
      structureNameP.style.display = 'block'
      structureName.style.display = 'none'
    } else {
      structureNameP.style.display = 'block'
      structureName.style.display = 'none'
    }


  }
  async saveProforgName() {
    const proforgName = this.proforgNameTextarea.nativeElement
    const proforgNameP = this.proforgNameP.nativeElement
    if (this.proforgName) {
      this.proforgNameLength = String(proforgName.value.length)
      proforgName.setAttribute('readonly', '')
      proforgName.setAttribute('size', String(Number(this.proforgNameLength) * 1.05))
      proforgName.blur()
      await this.apiServiceService.editStructure(this.structureName, this.proforgName, this.selectedData.id)

      this.apiServiceService.structure$.subscribe((data) => {
        if (data.error) {
          let error = data.error.message
          this.apiServiceService.error.next(String(error))
          this.selectedData.proforg = this.notEditProforgName
          this.proforgName = this.notEditProforgName
        } else {
 
          this.apiServiceService.responseOK.next('ФИО профорга успешно изменено')
        }
      })
      proforgNameP.style.display = 'block'
      proforgName.style.display = 'none'
    } else {
      proforgNameP.style.display = 'block'
      proforgName.style.display = 'none'
    }


  }

  showEditStructureNameForm() {
    const structureName = this.structureNameTextarea.nativeElement
    const structureNameP = this.structureNameP.nativeElement
    structureNameP.style.display = 'none'
    structureName.style.display = 'block'
    structureName.removeAttribute('readonly')
    structureName.focus()
  }
  showEditProforgNameForm() {
    const proforgName = this.proforgNameTextarea.nativeElement
    const proforgNameP = this.proforgNameP.nativeElement
    proforgNameP.style.display = 'none'
    proforgName.style.display = 'block'
    proforgName.removeAttribute('readonly')
    proforgName.focus()
  }


  showAddModal() {

    this.modalService.data$.next(this.selectedData)
    this.modalService.action$.next('add')
    this.modalService.stateOpen$.next(true)
    this.modalService.modalTitle$.next('Добавить подразделение')
  }
  showDelModal() {

    this.deleteService.stateOpen$.next(true)
    this.deleteService.type$.next('structure')
    this.deleteService.modalTitle$.next('Удалить структуру')
  }

  sortBySubID(arr) {
    return arr.sort((a, b) => a.subdepartment_id > b.subdepartment_id ? 1 : -1);
  }


  updateCharts(structureChart, structureChart2) {
    // Обнуление массивов с данными подразделений
    this.selectedDataStructures.length = 0
    this.selectedDataStructuresUsers.length = 0

    this.currentValueForDiagram.length = 0
    this.diagramData = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
    // Получение массивов с данным подразделений
    this.selectedSubDepartments.forEach((element: any) => {
      this.selectedDataStructures.push(element.title)
      this.selectedDataStructuresUsers.push(element.members_total)
    });
    // Заполнение массива данных для диаграммы
    if (this.stats.length != 0) {

      if (this.stats.length != 1) {

        for (let index = 1; index < this.stats.length; index++) {

          for (const key in this.diagramData) {
            let month = this.stats[index].date_time.slice(3, 5)
            // Так как stats отсортированы по id подразделений и времени, то мы можем забирать количество участников конкретного подразделения в момент, когда следующий id будет другого подразделения
            if (this.stats[index].subdepartment_id != this.stats[index - 1].subdepartment_id) {
              // Если месяц записи в подразделении совпадает с именем свойства diagramData, то прибавляем его к свойству объекта diagramData
              if (month == key) {

                this.diagramData[key] += (this.stats[index - 1].current_total)

              }
            }
            // Последнюю запись просто прибавляем, так как не с чем сравнить
            if (index == this.stats.length - 1) {

              if (month == key) {

                this.diagramData[key] += (this.stats[index].current_total)

              }
            }
          }

        }
      }
      // Если в массиве только один элемент
      else {

        for (const key in this.diagramData) {
          let month = this.stats[0].date_time.slice(3, 5)
          if (month == key) {
            this.diagramData[key] += (this.stats[0].current_total)
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
 
    this.apiServiceService.downloadExcelDepartment(this.selectedData.id, this.selectedData.title)
  }

  async getDepartmentDataById(id) {
    return await this.apiServiceService.getDepartmentById(id);
  }
  async getSubDepartmentsData() {
    return await this.apiServiceService.getSubDepartments();
  }
  async getDepartmentsData() {
    await this.apiServiceService.getDepartments();
  }
  async getStats(nowDateMinusOneYear, nowDate, subID) {
    this.apiServiceService.getStats(nowDateMinusOneYear, nowDate, subID)

  }

  ngOnChanges(): void {
    this.subscription.unsubscribe();
  }
  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  ngOnInit(): void {



    this.apiServiceService.stats$.subscribe((data) => {
      this.stats = data.stats
    })
    // Фильтрация подразделения под конкретную структуру
    const subdepSub = this.apiServiceService.subdepartments$.subscribe((data) => {
 
      this.subDepartments = data.subdepartments

      this.selectedSubDepartments.length = 0
      this.subDepartments.forEach((element: any) => {
        if (element.head_department_id == this.selectedData.id) {
          this.selectedSubDepartments.push(element)
        }
      });

      this.selectedSubDepartmentsIds.length = 0
      this.selectedSubDepartments.forEach((element: any) => {
        this.selectedSubDepartmentsIds.push(element.id)

      });

      const nowDate = this.formatDate(new Date())
      const nowDateMinusOneYear = (this.formatDate(new Date()).slice(0, -4)) + Number(new Date().getFullYear() - 1)
      this.getStats(nowDateMinusOneYear, nowDate, this.selectedSubDepartmentsIds)



    })
    this.subscription.add(subdepSub)

    const statsSub = this.apiServiceService.stats$.subscribe(() => {
      this.selectedSubDepartmentsIds.forEach((id) => {
        this.getDynamic(id)
      })
      this.updateCharts(structureChart, structureChart2)
    })
    this.subscription.add(statsSub)

    // Подписка для того, чтобы дождаться загрузки данных о структурах. Иначе при обновлении страницы, она будет пустой (данные еще не будут подгружены с backend-а)
    // const departmentSub = this.apiServiceService.departments$.subscribe((data) => {
    //   this.data = data
    //   console.log('DATASFASF')
    // })
    // this.subscription.add(departmentSub);


    this.data = this.apiServiceService.departments
    const departmentSub = this.apiServiceService.departments$.subscribe(async (data) => {
      this.dynamics.length = 0
      this.subDepartmentsForCharts.length = 0
      this.selectedSubDepartments.length = 0
      this.data = data

      this.data.forEach(async (element: any) => {
        if (this.selectedStructureId == element.id) {
          this.equalID = true
          this.selectedData = element;
          this.deleteService.data$.next(element)
          this.modalService.data$.next(element)

          this.proforgName = this.selectedData.proforg
          this.structureName = this.selectedData.title
          // Костыль для редактирования названия структуры и имени профорга. При неправильном вводе, возвращается не изменённое значение
          this.notEditStructureName = this.selectedData.title
          this.notEditProforgName = this.selectedData.proforg
          try {
            this.titleLength = String(this.selectedData.title.length * 20)
            const structureName = this.structureNameTextarea.nativeElement
            structureName.style.width = this.titleLength + 'px'
            // structureName.setAttribute('size', this.titleLength)
          } catch (error) {

          }
          try {
            this.proforgNameLength = String(this.selectedData.proforg.length * 20)
            const proforgName = this.proforgNameTextarea.nativeElement
            proforgName.setAttribute('size', this.proforgNameLength)
          } catch (error) {

          }

        }
      })
      await this.getSubDepartmentsData()
      if (this.equalID == true) {

      } else {
        this.ROUTER.navigate(['main/members']);
        this.equalID = true
      }

    })
    // Подписка на изменение параметров (id) в маршруте
    const routerSub = this.route.params.subscribe(async (params) => {
      this.dynamics.length = 0
      this.subDepartmentsForCharts.length = 0
      this.selectedSubDepartments.length = 0
      this.selectedStructureId = params.id
      // this.data = this.apiServiceService.departments

      this.data.forEach(async (element: any) => {
        if (this.selectedStructureId == element.id) {
          this.equalID = true
          this.selectedData = element;
          this.selectedData = element;
          this.deleteService.data$.next(element)
          this.proforgName = this.selectedData.proforg
          this.structureName = this.selectedData.title
          // Костыль для редактирования названия структуры и имени профорга. При неправильном вводе, возвращается не изменённое значение
          this.notEditStructureName = this.selectedData.title
          this.notEditProforgName = this.selectedData.proforg
          try {
            this.titleLength = String(this.selectedData.title.length * 20)
            const structureName = this.structureNameTextarea.nativeElement
            structureName.style.width = this.titleLength + 'px'
            // structureName.setAttribute('size', this.titleLength)
          } catch (error) {

          }
          try {
            this.proforgNameLength = String(this.selectedData.proforg.length * 20)
            const proforgName = this.proforgNameTextarea.nativeElement
            proforgName.setAttribute('size', this.proforgNameLength)
          } catch (error) {

          }

        }
      })


      await this.getSubDepartmentsData()
      if (this.equalID == true) {

      } else {
        this.ROUTER.navigate(['main/members']);
        this.equalID = true
      }
    })
    this.subscription.add(routerSub);
    this.subscription.add(departmentSub);



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
