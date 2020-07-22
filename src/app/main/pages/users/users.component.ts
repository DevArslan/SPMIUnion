import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private apiServiceService: ApiServiceService,
    private authService: AuthService
  ) {}
  roles: {};
  users: any;
  username: string = '';

  error: string = 'Сначала выберите пользователя';
  userID: any;
  roleIsAdmin: boolean;

  ngOnInit(): void {
    if (this.authService.loginData.role == 'Administrator') {
      this.roleIsAdmin = true;
    }

    this.apiServiceService.getRoles();
    this.apiServiceService.roles$.subscribe((dataFromApi: any) => {
      this.roles = dataFromApi.roles;
    });

    this.apiServiceService.getUsers();
    this.apiServiceService.users$.subscribe((dataFromApi: any) => {
      this.users = dataFromApi.users;
      console.log(this.users);
    });

    this.apiServiceService.selectedUserId$.subscribe((data) => {
      this.userID = data;
      if (this.userID) {
        this.error = '';
      } else {
        this.error = 'Сначала выберите пользователя';
      }
    });
  }

  showAddModal() {
    const modal = document.getElementById('usersAddModal');
    modal.style.display = 'block';
  }
  showEditModal() {
    if (this.userID) {
      this.error = '';
      const modal = document.getElementById('usersEditModal');
      modal.style.display = 'block';
      this.error = 'Сначала выберите пользователя';
    }
  }
  showDelModal() {
    if (this.userID) {
      this.error = '';
      const modal = document.getElementById('usersDelModal');
      modal.style.display = 'block';
      this.error = 'Сначала выберите пользователя';
    }
  }
}
