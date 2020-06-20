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
  faculty: string = 'Факультет'
  structure: string = 'Подразделение'

  closeModal(){
    const modal = document.getElementById('membersAddModal')
    modal.style.display = "none";
  }
}
