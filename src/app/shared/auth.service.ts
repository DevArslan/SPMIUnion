import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
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
    }
  }
  getToken(){
    this.token = sessionStorage.getItem('token')
    return this.token
  }

}
