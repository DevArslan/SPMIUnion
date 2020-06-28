import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SPMIUnion';

  constructor(private authService: AuthService) { }

  async getDepartments() {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/departments'
    const token = this.authService.getToken()
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
    })
      .then((res) => res.json())
      .then(data => console.log(data))
  }

  ngOnInit(): void {
    this.getDepartments()
  }



}
