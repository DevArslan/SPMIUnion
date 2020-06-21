import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members-add-modal',
  templateUrl: './members-add-modal.component.html',
  styleUrls: ['./members-add-modal.component.scss']
})
export class MembersAddModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  facultyDropdown: boolean = false
  faculty: string = 'Факультет'
  structure: string = 'Подразделение'
  faculties: string[] = ['Геологоразведочный факультет', 'Горный факультет', 'Механико-машиностроительный факультет', 'Нефтегазовый факультет', 'Факультет переработки минерального сырья']

  closeModal(){
    const modal = document.getElementById('membersAddModal')
    modal.style.display = "none";
  }
  dropDownFaculty(){
    this.facultyDropdown = !this.facultyDropdown
  }
}
