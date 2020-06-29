import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members-delete-modal',
  templateUrl: './members-delete-modal.component.html',
  styleUrls: ['./members-delete-modal.component.scss']
})
export class MembersDeleteModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  closeModal(){
    const modal = document.getElementById('membersDelModal')
    modal.style.display = "none";
  }
}
