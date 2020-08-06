import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../../shared/api.service";
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {

  constructor(private API: ApiService, private modalService: ModalService) { }

  roleDropdown: boolean = false;
  roleLabel: string = 'Выберите роль';

  roles: [] = []
  username: string;
  password: string;
  login: string;
  roleID: number;
  userID: number;
  users: any;

  error = '';

  action: string;
  modalTitle: string;
  stateOpen: boolean = false;

  async createUser() {

    await this.API.createUser(
      this.username,
      this.login,
      this.password
    );
  }

  async editUser() {
    await this.API.editUser(this.userID, this.roleID);

  }

  closeModal() {
    this.modalService.stateOpen$.next(false);
    this.username = undefined;
    this.password = undefined;
    this.login = undefined;
    this.roleLabel = 'Выберите роль';

  }

  selectRole(event) {
    this.roleLabel = event.target.dataset.selectRole;
    this.roleID = event.target.dataset.roleId;
    this.dropDownRole();
  }

  dropDownRole() {
    this.roleDropdown = !this.roleDropdown;
  }

  ngOnInit(): void {

    this.modalService.data$.subscribe((roles)=>{

      this.roles = roles
    })
    this.modalService.stateOpen$.subscribe((state)=>{

      this.stateOpen = state;
    })
    this.modalService.modalTitle$.subscribe((title) => {
      this.modalTitle = title;
    })
    this.modalService.action$.subscribe((action)=>{
      this.action = action
    })

    this.API.user$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.API.error.next(String(this.error))
      } else {
        if (this.action == 'add') {
          this.API.responseOK.next('Пользователь успешно создан')
        } else {
          this.API.responseOK.next('Пользователь успешно изменен')
        }
        this.API.getUsers()
        this.closeModal()
        this.roleLabel = 'Роль';
      }
    })

    this.API.users$.subscribe((dataFromApi: any) => {
      this.users = dataFromApi.users;
      this.API.selectedUserId$.subscribe((data) => {
        this.userID = data;
        if (this.userID) {
          this.error = '';
        } else {
          this.error = 'Сначала выберите участников';
        }
        this.users.forEach((user): any => {
          if (user.id == this.userID) {
            this.roleLabel = user.role;
          }
        });
      });
    });
  }

}
