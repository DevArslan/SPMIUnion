import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ModalService } from "../../../ui-components/modal/modal.service";
import { STORAGE_KEY } from '../../../CONFIG';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private apiServiceService: ApiServiceService,
    private authService: AuthService,
    private modalService: ModalService
  ) {}
  roles: any;
  user: any;
  users: any;
  username: string = '';

  error: string = 'Сначала выберите пользователя';
  userID: any;
  roleIsAdmin: boolean;

  title: string = ''

  changeModal(title,action){
    this.modalService.modalParams.next({title,action})
  }

  ngOnInit(): void {

    this.apiServiceService.getRoles();
    this.apiServiceService.roles$.subscribe((dataFromApi: any) => {
      
      this.roles = dataFromApi.roles;
      console.log(this.roles)
    });

    this.apiServiceService.getUsers()
    this.apiServiceService.users$.subscribe((dataFromApi: any) => {
      this.users = dataFromApi.users
      console.log(this.users)
    })

    this.apiServiceService.selectedUserId$.subscribe((data) => {
      this.userID = data;
      if (this.userID) {
        this.error = '';
      } else {
        this.error = 'Сначала выберите пользователя';
      }
    });
  }

  showAddModal(title,action) {
    // const modal = document.getElementById('usersAddModal');
    // modal.style.display = 'block';
    this.modalService.modalParams.next({title,action})
  }
  showEditModal(title,action) {
    if (this.userID) {
      this.error = '';

      this.error = 'Сначала выберите пользователя';
      this.modalService.modalParams.next({title,action})
    }
  }
  showDelModal(title,action) {
    if (this.userID) {
      this.error = '';

      this.error = 'Сначала выберите пользователя';
      this.modalService.modalParams.next({title,action})
    }
  }
}
