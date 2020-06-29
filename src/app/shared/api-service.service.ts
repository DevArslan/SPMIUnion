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
  members: {}[]
  departments$ = new Subject<{}[]>();
  members$ = new Subject<{}[]>();
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
        this.departments$.next(this.departments);
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

        return data
      }
      )
  }

  // Создать подразделение
  async createSubDepartment(title, departmentID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/subdepartments'
    const token = this.authService.getToken()
    const data = {
      title: title,
      head_department_id: departmentID
    }

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

  // Получение списка участников
  async getMembers() {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members'
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
        this.members = data
        this.members$.next(this.members);
        return data
      }
      )
  }

  // Создание нового участника профсоюза
  async createMember(name, card, subdepartment,student) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members'
    const token = this.authService.getToken()
    const data = {
      name: name,
      card: card,
      is_student: student,
      subdepartment_id : subdepartment
    }

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
