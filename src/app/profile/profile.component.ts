import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/shared/auth.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  loginData: {'id':string, 'login': string, 'name': string, 'registered': string, 'role': string} = this.authService.loginData

  quit(){
    this.authService.quit()
  }
  ngOnInit(): void {



  }

}
