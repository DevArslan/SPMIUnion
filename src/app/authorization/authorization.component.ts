import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service'

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login: string = ''
  password: string = ''
  remember: boolean = false
  error: string = ''

  auth() {
    if (this.login && this.password) {
      const url = 'https://digital.spmi.ru/profsouz_test/api/v1/users/login'

      const data = {
        login: this.login,
        password: this.password,
        remember: this.remember
      }

      const token = window.btoa(`${data.login}:${data.password}`);
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
            localStorage.setItem('jsonData',JSON.stringify(jsonData))
            localStorage.setItem('token',token)
          } else {
            this.authService.profileData = jsonData
            sessionStorage.setItem('jsonData',JSON.stringify(jsonData))
            sessionStorage.setItem('token',token)
          }
        })
        .then(() => {
          if (this.authService.profileData.role == 'Administrator') {
            this.router.navigate(['main/members']);
          }
        })
    }
    if (!this.login) {
      alert('Требуется указать имя');
    }
    if (!this.password) {
      alert('Требуется указать пароль');
    }
  }
}
