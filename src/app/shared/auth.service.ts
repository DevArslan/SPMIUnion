import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  IsAuthenticated(){
    console.log('auth')
    if(localStorage.getItem('token')){
      console.log('auth')
      return true
    }else{
      return false
    }
  }

}
