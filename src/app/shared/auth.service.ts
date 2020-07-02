import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  loginData: { 'id': string, 'login': string, 'name': string, 'registered': string, 'role': string } = { 'id': '', 'login': '', 'name': '', 'registered': '', 'role': '' }
  token: string = ''
  profileData: { 'id': string, 'login': string, 'name': string, 'registered': string, 'role': string } = { 'id': '', 'login': '', 'name': '', 'registered': '', 'role': '' }

  IsAuthenticated() {

    if (sessionStorage.getItem('jsonData')) {
      this.loginData = JSON.parse(sessionStorage.getItem('jsonData'))
      if (this.loginData.role == 'Administrator') {
        return true
      } else {
        return false
      }
    }else if(localStorage.getItem('jsonData')){
      this.loginData = JSON.parse(localStorage.getItem('jsonData'))
      if (this.loginData.role == 'Administrator') {
        return true
      } else {
        return false
      }
    }
  }
  getToken(){
    if(sessionStorage.getItem('token')){
      this.token = sessionStorage.getItem('token')
    }else if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
    }
    
    return this.token
  }
  quit(){
    sessionStorage.removeItem('jsonData')
    sessionStorage.removeItem('token')
    localStorage.removeItem('jsonData')
    localStorage.removeItem('token')
    this.router.navigate(['auth']);
  }

}
