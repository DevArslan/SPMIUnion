import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  
  @Input() users:{}[] = []
  constructor(private api: ApiServiceService) { }

  selectedUserId: number

  ngOnInit(): void {
    console.log(this.users)
  }

  selectUser(event) {
    
    const rows = document.querySelectorAll('.usersTableDataRow')
    rows.forEach(element => {
      element.classList.remove('selectedRow')
      element.id = null
    });
    if (this.selectedUserId == event.currentTarget.dataset.memberId) {
      event.currentTarget.classList.remove('selectedRow')
      this.selectedUserId = undefined
      event.currentTarget.id = null
    } else {
      event.currentTarget.classList.add('selectedRow')
      event.currentTarget.id = 'selectedMember'
      this.selectedUserId = event.currentTarget.dataset.memberId
    }
    console.log(this.selectedUserId)
    this.api.selectedUserId$.next(this.selectedUserId)
    event.stopPropagation()
  }

}
