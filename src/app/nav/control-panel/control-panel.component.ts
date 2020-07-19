import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service'
@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  constructor(private authService: AuthService) { }

  roleIsAdmin: boolean

  ngOnInit(): void {
    // Проверка роли пользователя, если администратор, то доступны все страницы
    if(this.authService.loginData.role == 'Administrator'){
      this.roleIsAdmin = true
    }
  }
  structureDropdown: boolean = false
  dropDownStructure(){
    this.structureDropdown = !this.structureDropdown
  }
}
