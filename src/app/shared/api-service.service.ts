import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private authService: AuthService) { }
  selectedDepartment: string
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

  // Получение данных структрах по ID
  async getDepartmentById(departmentID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/departments/' + departmentID
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
        console.log(data)
        return data
      }
      )
  }

  // Получение списка подразделений
  async getSubDepartments() {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/subdepartments'
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
        console.log(data)
        return data
      }
      )
  }


  async createSubDepartment(title, departmentID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/subdepartments'
    const token = this.authService.getToken()
    const data = {
      title : title,
      head_department_id : departmentID
    }
    console.log(data)
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
      body: JSON.stringify(data),
    })
      .then((res) => console.log(res.json()))
  }

  ngOnInit(): void {
    this.getDepartments()
  }

}
