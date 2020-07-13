import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service'
import * as base64 from "base-64"
import * as utf8 from "utf8"
@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.IsAuthenticated()){
      this.router.navigate(['main/members'])
    }
  }

  login: string = ''
  password: string = ''
  remember: boolean = false

  error: string = ''
  loginError: string = ''
  passwordError: string = ''

  resetErrors() {
    this.loginError = ' '
    this.passwordError = ' '
    this.error = ' '
  }

  auth() {

    this.loginError = ''
    this.passwordError = ''
    this.error = ''
    if (this.login && this.password) {
      const url = 'https://digital.spmi.ru/profsouz_test/api/v1/users/login'

      const data = {
        login: this.login,
        password: this.password,
        remember: this.remember
      }
      const utf8_info = utf8.encode(`${data.login}:${data.password}`)
      const token = base64.encode(utf8_info)
      // const token = window.btoa(`${data.login}:${data.password}`);
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${token}`
        },
      })
        .then(res => res.json())
        .catch(() => this.error = 'Введен неверный пароль или логин')
        .then(jsonData => {
          if (data.remember == true) {
            console.log(data.remember)
            this.authService.profileData = jsonData
            localStorage.setItem('jsonData', JSON.stringify(jsonData))
            localStorage.setItem('token', token)
          } else {
            this.authService.profileData = jsonData
            sessionStorage.setItem('jsonData', JSON.stringify(jsonData))
            sessionStorage.setItem('token', token)
          }
        })
        .then(() => {
          if (this.authService.profileData.role == 'Administrator') {
            this.router.navigate(['main/members']);
          }
        })
    }
    if (!this.login) {
      this.loginError = 'Требуется указать имя'
    }
    if (!this.password) {
      this.passwordError = 'Требуется указать пароль'
    }
    setTimeout(() => {
      this.loginError = ''
      this.passwordError = ''
      this.error = ''
    }, 2500)
  }
}
