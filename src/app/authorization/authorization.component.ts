import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  login: string = ''
  password: string = ''
  error: string = ''

  auth(){

    if(this.login == 'admin' && this.password == 'admin'){
      localStorage.setItem('token','token')
      this.router.navigate(['main/members']);
    }else{
      this.error = 'Введен неверный пароль или логин'
    }

  }


}
