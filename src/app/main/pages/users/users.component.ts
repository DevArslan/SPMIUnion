import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Subscription, of } from 'rxjs';
import { STORAGE_KEY } from '../../../CONFIG';
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

  private subscription: Subscription = new Subscription();

  roles: any;
  user: any;
  users: any;
  username: string = '';

  error: string = 'Сначала выберите пользователя';
  userID: any;
  roleIsAdmin: boolean;

  ngOnDestroy(): void {    
    console.log(this.subscription)
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.apiServiceService.getRoles();
    const rolesSub = this.apiServiceService.roles$.subscribe((dataFromApi: any) => {
      
      this.roles = dataFromApi.roles;
      console.log(this.roles)
    });
    this.subscription.add(rolesSub)

    this.apiServiceService.getUsers()
    const usersSub = this.apiServiceService.users$.subscribe((dataFromApi: any) => {
      this.users = dataFromApi.users
      console.log(this.users)
    })
    this.subscription.add(usersSub)

    const userSub =  this.apiServiceService.selectedUserId$.subscribe((data) => {
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
