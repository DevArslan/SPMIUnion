import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ADMIN_ROLE } from '../../../CONFIG';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  constructor(private authService: AuthService) {}

  roleIsAdmin: boolean;
  structureDropdown: boolean = false;

  ngOnInit(): void {
    // Проверка роли пользователя, если администратор, то доступны все страницы
    // if (this.authService.loginData.role == ADMIN_ROLE) {
    //   this.roleIsAdmin = true;
    // }
    /* NOTE: Вот так более корректно */
    this.authService.currentUserObservable.subscribe((user) => {
      this.roleIsAdmin = user.role == ADMIN_ROLE ? true : false;
    });
  }

  /* NOTE: Не забывай отступы ставить, чтобы код более читабельным был */
  dropDownStructure() {
    this.structureDropdown = !this.structureDropdown;
  }
}
