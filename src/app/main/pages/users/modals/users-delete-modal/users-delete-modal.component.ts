import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/api-service.service';
@Component({
  selector: 'app-users-delete-modal',
  templateUrl: './users-delete-modal.component.html',
  styleUrls: ['./users-delete-modal.component.scss'],
})
export class UsersDeleteModalComponent implements OnInit {
  constructor(private apiServiceService: ApiServiceService) {}
  userID: any;
  error: '';
  closeModal() {
    const modal = document.getElementById('usersDelModal');
    modal.style.display = 'none';
  }

  async deleteMember() {


    await this.apiServiceService.deleteUser(this.userID);

  }

  ngOnInit(): void {
    this.apiServiceService.selectedUserId$.subscribe((id) => {
      this.userID = id;
    });
    this.apiServiceService.user$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.apiServiceService.error.next(String(this.error))
      } else {
        this.apiServiceService.responseOK.next('Пользователь успешно удалён')
        this.apiServiceService.getUsers()
        this.closeModal()
      }
    })
  }
}
