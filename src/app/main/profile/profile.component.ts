import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loginData: User;

  constructor(private authService: AuthService) {}

  //loginData: User = this.authService.loginData;

  quit() {
    this.authService.logout();
  }

  ngOnInit(): void {
    /* NOTE: Вот так более корректно */
    this.authService.currentUserObservable.subscribe((user) => {
      this.loginData = user;
    });
  }
}
