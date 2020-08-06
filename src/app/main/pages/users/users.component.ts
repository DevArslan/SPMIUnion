import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Subscription, of } from 'rxjs';
import { STORAGE_KEY } from '../../../CONFIG';
import { DeleteService } from "../../shared/delete.service";
import { ModalService } from "./shared/modal.service";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private apiServiceService: ApiService,
    private authService: AuthService,
    private deleteService: DeleteService,
    private modalService: ModalService,
  ) { }

  private subscription: Subscription = new Subscription();

  roles: any;
  user: any;
  users: any;
  username: string = '';

  error: string = 'Сначала выберите пользователя';
  userID: any;
  roleIsAdmin: boolean;

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.apiServiceService.getRoles();
    const rolesSub = this.apiServiceService.roles$.subscribe((dataFromApi: any) => {
      this.modalService.data$.next(dataFromApi.roles)
      this.roles = dataFromApi.roles;

    });
    this.subscription.add(rolesSub)

    this.apiServiceService.getUsers()
    const usersSub = this.apiServiceService.users$.subscribe((dataFromApi: any) => {
      this.users = dataFromApi.users

    })
    this.subscription.add(usersSub)

    const userSub = this.apiServiceService.selectedUserId$.subscribe((data) => {
      this.userID = data;
      if (this.userID) {
        this.error = '';
      } else {
        this.error = 'Сначала выберите пользователя';
      }
    });
    this.subscription.add(userSub)
  }

  showAddModal() {

    this.modalService.stateOpen$.next(true)
    this.modalService.action$.next('add')
    this.modalService.modalTitle$.next('Добавить пользователя')

  }
  showEditModal() {

    if (this.userID) {
      this.error = '';
      this.modalService.stateOpen$.next(true)
      this.modalService.action$.next('edit')
      this.modalService.modalTitle$.next('Изменить пользователя')
      this.error = 'Сначала выберите пользователя';
    }
  }
  showDelModal() {
    if (this.userID) {
      this.error = '';
      this.deleteService.stateOpen$.next(true)
      this.deleteService.type$.next('user')
      this.deleteService.modalTitle$.next('Удалить пользователя')
      this.error = 'Сначала выберите пользователя';
    }
    this.error = 'Сначала выберите участника'
  }
}
