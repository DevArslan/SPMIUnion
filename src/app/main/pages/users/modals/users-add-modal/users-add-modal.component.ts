import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/api-service.service';
@Component({
  selector: 'app-users-add-modal',
  templateUrl: './users-add-modal.component.html',
  styleUrls: ['./users-add-modal.component.scss'],
})
export class UsersAddModalComponent implements OnInit {
  @Input() roles: [] = [];
  constructor(private apiServiceService: ApiServiceService) { }
  roleDropdown: boolean = false;
  roleLabel: string = 'Выберите роль';

  username: string;
  password: string;
  login: string;

  error = '';
  ngOnInit(): void {
    this.apiServiceService.user$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.apiServiceService.error.next(String(this.error))
      } else {
        this.apiServiceService.responseOK.next('Пользователь успешно создан')
        this.apiServiceService.getUsers()
        this.closeModal()
      }
    })

  }
  async createUser() {

    await this.apiServiceService.createUser(
      this.username,
      this.login,
      this.password
    );
    


  }
  closeModal() {
    const modal = document.getElementById('usersAddModal');
    modal.style.display = 'none';
    this.username = undefined;
    this.password = undefined;
    this.login = undefined;
    this.roleLabel = 'Выберите роль';

  }

  selectRole(event) {
    this.roleLabel = event.target.dataset.selectRole;
    this.dropDownRole();
  }

  dropDownRole() {
    this.roleDropdown = !this.roleDropdown;
  }
}
