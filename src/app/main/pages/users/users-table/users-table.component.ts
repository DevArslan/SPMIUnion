import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  @Input() users: {}[] = [];
  constructor(private api: ApiService) {}

  selectedUserId: number;

  ngOnInit(): void {

  }

  selectUser(event) {
    const rows = document.querySelectorAll('.usersTableDataRow');
    rows.forEach((element) => {
      element.classList.remove('selectedRow');
      element.id = null;
    });
    if (this.selectedUserId == event.currentTarget.dataset.memberId) {
      event.currentTarget.classList.remove('selectedRow');
      this.selectedUserId = undefined;
      event.currentTarget.id = null;
    } else {
      event.currentTarget.classList.add('selectedRow');
      event.currentTarget.id = 'selectedMember';
      this.selectedUserId = event.currentTarget.dataset.memberId;
    }

    this.api.selectedUserId$.next(this.selectedUserId);
    event.stopPropagation();
  }
}
