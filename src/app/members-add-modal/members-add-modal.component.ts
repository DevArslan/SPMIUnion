import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";
import {filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import {fromEvent } from 'rxjs';
@Component({
  selector: 'app-members-add-modal',
  templateUrl: './members-add-modal.component.html',
  styleUrls: ['./members-add-modal.component.scss']
})
export class MembersAddModalComponent implements OnInit {

  @Input() dataForModal: {}[] = []
  constructor(private apiServiceService: ApiServiceService) { }
  membersDropdown: boolean = false
  structureDropdown: boolean = false
  facultyDropdown: boolean = false
  faculty: string = 'Факультет'
  structure: string = 'Подразделение'
  structures: string[] = ['Сначала выберите факультет']
  members: any = []

  name: string = ''
  card: string
  subdepartmentID: number
  isStudent: boolean

  @ViewChild('inputName') input: ElementRef;

  
  
  searchInAKSP(name) {
    this.apiServiceService.getMembersAKPS(name)
  }

  createMember() {
    this.apiServiceService.createMember(this.name, this.card, this.subdepartmentID, this.isStudent)
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

  selectMember(event){
    console.log(event)

    this.name = event.target.dataset.selectName
    event.target.placholder = this.name

    this.card = event.target.dataset.selectCard
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
  }

  dropDownFaculty() {
    this.facultyDropdown = !this.facultyDropdown
  }
  dropDownStructure() {
    this.structureDropdown = !this.structureDropdown
  }
  dropDownMembers(){
    this.membersDropdown = !this.membersDropdown
  }

  ngOnInit(): void {
    this.apiServiceService.membersAKPS$.subscribe((dataFromAPI)=>{
      this.members = dataFromAPI
      console.log(this.members)
      this.membersDropdown = true
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
          const memberName  = this.input.nativeElement.value
          await this.searchInAKSP(memberName)
          
          console.log(this.members)
        })
      )
      .subscribe();
  }

}
