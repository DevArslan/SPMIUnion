import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  /* NOTE: Лучше переменные объявлять в начале Компонента */
  login: string = '';
  password: string = '';
  remember: boolean = false;

  /* NOTE: Посмотри Reactive Forms https://angular.io/guide/reactive-forms */
  error: string = '';
  loginError: string = '';
  passwordError: string = '';

  waitingForServerResponse: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['main/members']);
    }
  }

  resetErrors() {
    this.loginError = ' ';
    this.passwordError = ' ';
    this.error = ' ';
  }

  auth() {
    this.waitingForServerResponse = true
    console.log(this.waitingForServerResponse)
    /* NOTE: Раз вынес в отдельную функцию (что правильно), то нужно и использовать) */
    this.resetErrors();
    // this.loginError = ''
    // this.passwordError = ''
    // this.error = ''

    if (!this.login) {
      this.loginError = 'Требуется указать имя';
      this.waitingForServerResponse = false
    }
    if (!this.password) {
      this.passwordError = 'Требуется указать пароль';
      this.waitingForServerResponse = false
    }

    if (this.login && this.password) {
      /* NOTE: Поскольку метод login теперь в сервисе, то вызываем метод */
      this.authService
        .login(this.login, this.password, this.remember)
        .subscribe(
          (res) =>{
            this.waitingForServerResponse = false
            this.router.navigate(['main/members'])
          } ,
          (err) => {
            this.waitingForServerResponse = false
            this.error = 'Введен неверный пароль или логин';
            /* NOTE: Ошибка стирается только после того как придет ответ от сервака */
            setTimeout(() => {
              this.resetErrors();
            }, 2500);
          }
        );
    }
  }
}
