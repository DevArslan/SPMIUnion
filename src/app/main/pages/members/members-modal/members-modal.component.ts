import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Input } from "@angular/core";
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ModalService } from "../shared/modal.service";
import { ApiServiceService } from "../../../../shared/api-service.service";

@Component({
  selector: 'app-members-modal',
  templateUrl: './members-modal.component.html',
  styleUrls: ['./members-modal.component.scss']
})
export class MembersModalComponent implements OnInit {

  @Output() childEvent = new EventEmitter();
  @ViewChild('inputName') input: ElementRef;

  // Приходит с сервиса modalService
  action: string = '';
  stateOpen: boolean = false;
  modalTitle: string;
  dataForModal: {}[] = []
  
  data:{}[] = []
  memberID: number
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

  constructor(private modalService : ModalService, private API : ApiServiceService) { }

  async createMember() {
    let index = 1
    await this.API.createMember(this.name, this.card, this.subdepartmentID, this.isStudent)
    const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
    selectAllCheckbox.checked = false
  }

  async editMember(){
    await this.API.editMember(this.name,this.card,this.subdepartmentID,this.isStudent,this.memberID)
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

  searchInAKSP(name) {
    this.API.getMembersAKPS(name)
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

  selectStructure(event) {
    this.structure = event.target.dataset.selectStructure
    this.subdepartmentID = event.target.dataset.selectId
    this.dropDownStructure()
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
  }

  closeModal() {
    this.modalService.stateOpen$.next(false)
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

  ngOnInit(): void {
    this.modalService.action$.subscribe((action)=>{
      this.action = action
    })
    this.modalService.stateOpen$.subscribe((state)=>{
      this.stateOpen = state
    })
    this.modalService.modalTitle$.subscribe((title)=>{
      this.modalTitle = title
    })
    this.modalService.data$.subscribe((data)=>{
      this.dataForModal = data
    })
    const membersSub = this.API.members$.subscribe((dataFromApi: any) => {
      this.data = dataFromApi.members
    })
    this.API.createMember$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.API.error.next(String(this.error))
      } else {
        this.API.responseOK.next('Участник успешно добавлен')
        this.childEvent.emit();
        this.closeModal()
      }
    })  
    
    this.API.membersAKPS$.subscribe((dataFromAPI: any) => {
      if (dataFromAPI.error) {
        this.error = dataFromAPI.message
        this.API.error.next(String(this.error))
      } else {
        this.members = dataFromAPI 
      }
      this.membersDropdown = true
    })
    this.API.preloader$.subscribe((dataFromAPI) => {
      this.preloader = dataFromAPI
    })


    this.API.editMember$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.API.error.next(String(this.error))
      } else {
        this.API.responseOK.next('Участник успешно изменен')
        this.childEvent.emit();
        this.API.selectedMemberId$.next(undefined)
        this.closeModal()
      }
    })  

    this.API.selectedMemberId$.subscribe((id)=>{
      console.log(id)
      this.structures.length = 0
      this.memberID = id
      this.data.forEach((element: any)=> {
        if(element.id == this.memberID){
          console.log(element.name)
          this.name = element.name 
          console.log(this.name)
          this.card = element.card 
          this.structure = element.subdepartment
          this.isStudent = element.is_student
        }
      });

      this.API.departments.forEach((department: any) => {
        department.sub_departments.forEach((subdepartment: any) => {
          if(subdepartment.title == this.structure){
            this.faculty = department.title
          }
        });
      });
      this.dataForModal.forEach((element: any) => {
        if (this.faculty == element.title) {
          element.sub_departments.forEach(item => {
            this.structures.push(item)
          });
        }
      })
    })

  }
  
  ngAfterViewInit() {
    // Обращение к серверу происходит после того, как пользователь не печатает на протяжении 1.5 секунд
    setTimeout(() => {
      fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap(async (text) => {
          console.log(this.input.nativeElement.value)
          const memberName = <HTMLInputElement>this.input.nativeElement.value
          const preloader = document.getElementById('preloader')
          if (String(memberName) != '') {
            const data = await this.searchInAKSP(memberName)
            console.log(data)
          } else {
            this.membersDropdown = false
          }

        })
      )
      .subscribe();
    }, 4000);
    
  }

}


