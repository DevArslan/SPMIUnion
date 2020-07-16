import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-members-add-modal',
  templateUrl: './members-add-modal.component.html',
  styleUrls: ['./members-add-modal.component.scss']
})
export class MembersAddModalComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  @Input() dataForModal: {}[] = []
  constructor(private apiServiceService: ApiServiceService) { }
  membersDropdown: boolean = false
  structureDropdown: boolean = false
  facultyDropdown: boolean = false
  faculty: string = 'Факультет'
  structure: string = 'Подразделение'
  structures: string[] = ['Сначала выберите факультет']
  members: any = []
  preloader: boolean = false

  error: string = ''

  name: string = ''
  card: string
  cardNumber: string
  subdepartmentID: number
  isStudent: boolean


  @ViewChild('inputName') input: ElementRef;

  closeAllDropdownWrapper(event){
    if (event.target == document.getElementById('modal')) {
      this.structureDropdown = false
      this.facultyDropdown = false
      this.membersDropdown = false
    }
  }
  closeAllDropdown(event) {
    console.log(event.target)
    console.log(document.getElementById('modalBack'))
    if (event.target == document.getElementById('modalBack')) {
      this.structureDropdown = false
      this.facultyDropdown = false
      this.membersDropdown = false
    }

    // event.stopPropagation()
  }

  searchInAKSP(name) {
    this.apiServiceService.getMembersAKPS(name)
  }


  async createMember() {
    let index = 1
    const promise = await this.apiServiceService.createMember(this.name, this.card, this.subdepartmentID, this.isStudent)
    const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
    selectAllCheckbox.checked = false
    // Добавление участника в таблицу без доп.запроса к API
    if (promise.error) {
      console.log(promise)
      this.error = promise.message;
      this.apiServiceService.error.next(String(this.error))

    } else {
      // Снизу добавление участника в таблицу без обращения к серверу
      //   const tableBody = <HTMLElement>document.getElementById('membersTableBody')
      //   const tableRowExist = <HTMLElement>document.querySelector('.membersTableDataRow')
      //   const memberData = {
      //     'memberId': promise.member.id,
      //     'memberName': promise.member.name,
      //     'memberSubDep': promise.member.subdepartment,
      //     'memberCard': promise.member.card,
      //     'memberIsStudent': promise.member.is_student,
      //     'memberActive': promise.member.active,
      //   }
      //   var tableRow = <HTMLElement>tableRowExist.cloneNode(true)
      //   const tableRowChildInput = <HTMLInputElement>tableRow.childNodes[0].firstChild
      //   tableRowChildInput.value = memberData.memberId

      //   for (const item in memberData) {
      //     const tableRowChild = <HTMLElement>tableRow.childNodes[index]
      //     tableRowChild.innerHTML = memberData[item]
      //     index +=1
      //     console.log(tableRowChild)
      // }
      // tableBody.appendChild(tableRow)
      this.apiServiceService.responseOK.next('Участник успешно добавлен')
      this.childEvent.emit();
      this.closeModal()
    }
  }

  selectFaculty(event) {
    this.structures.length = 0
    this.faculty = event.target.dataset.selectFaculty
    this.dropDownFaculty()
    this.dataForModal.forEach((element: any) => {
      if (this.faculty == element.title) {
        element.sub_departments.forEach(item => {
          this.structures.push(item)
        });
      }
    })
  }

  selectMember(event) {
    console.log(event)

    this.name = event.currentTarget.dataset.selectName
    event.target.placeholder = this.name

    this.card = event.currentTarget.dataset.selectCard
    this.cardNumber = 'номер карты: ' + String(event.currentTarget.dataset.selectCardNumber).toUpperCase()
    const cardInputElement = <HTMLInputElement>document.getElementById('cardNumber')
    cardInputElement.placeholder = this.card

    this.dropDownMembers()
    event.stopPropagation()
  }

  selectStructure(event) {
    this.structure = event.target.dataset.selectStructure
    this.subdepartmentID = event.target.dataset.selectId
    this.dropDownStructure()
  }

  closeModal() {
    const modal = document.getElementById('membersAddModal')
    modal.style.display = "none";
    this.faculty = 'Факультет'
    this.structure = 'Подразделение'
    this.name = '';
    this.card = '';
    this.isStudent = false
    this.error = ''
    this.subdepartmentID = null
    this.structures.length = 0
    this.cardNumber = ''
  }

  dropDownFaculty() {
    this.facultyDropdown = !this.facultyDropdown
    this.structureDropdown = false
    this.membersDropdown = false
  }
  dropDownStructure() {
    this.structureDropdown = !this.structureDropdown
    this.facultyDropdown = false
    this.membersDropdown = false

  }
  dropDownMembers() {
    this.membersDropdown = !this.membersDropdown
    this.structureDropdown = false
    this.facultyDropdown = false

  }

  ngOnInit(): void {
    this.apiServiceService.membersAKPS$.subscribe((dataFromAPI: any) => {
      if (dataFromAPI.error) {
        this.error = dataFromAPI.message
        this.apiServiceService.error.next(String(this.error))
      } else {
        this.members = dataFromAPI 
      }
      this.membersDropdown = true
    })
    this.apiServiceService.preloader$.subscribe((dataFromAPI) => {
      this.preloader = dataFromAPI
    })
  }

  ngAfterViewInit() {
    // Обращение к серверу происходит после того, как пользователь не печатает на протяжении 1.5 секунд
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap(async (text) => {
          // console.log(this.input.nativeElement.value)
          const memberName = <HTMLInputElement>this.input.nativeElement.value
          const preloader = document.getElementById('preloader')
          if (String(memberName) != '') {
            const data = await this.searchInAKSP(memberName)
          } else {
            this.membersDropdown = false
          }

        })
      )
      .subscribe();
  }

}
