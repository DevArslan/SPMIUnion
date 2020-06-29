import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private authService: AuthService) { }

  departments: {}[]
  postData$ = new Subject<{}[]>();
  // Получение данных о структурах
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
      .then(data => {
        this.departments = data.departments;
        this.postData$.next(this.departments);
      }
    )
  }

  // Получение данных по подразделениях
  async getSubDepartments(departmentID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/subdepartments/'+ departmentID
    const token = this.authService.getToken()
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
    })
      .then((res) => res.json())
      .then(data => {
        return data
      }
    )
  }

  ngOnInit(): void {
    this.getDepartments()
  }

}
