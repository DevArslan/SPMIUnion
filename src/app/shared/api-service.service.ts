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
  roles: []
  users: []
  loadingCompleted: boolean

  users$ = new Subject<{}[]>()
  departments$ = new Subject<{}[]>();
  members$ = new Subject<{}[]>();
  roles$ = new Subject<[]>();
  postData$ = new Subject<{}[]>();
  loadingCompleted$ = new Subject<{}>()
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
  // Создание структуры
  async createDepartment(title, proforg) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/departments'
    const token = this.authService.getToken()
    const data = {
      title: title,
      proforg: proforg
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

  // Удаление структуры
  async deleteDepartment(departmentID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/departments/' + departmentID
    const token = this.authService.getToken()
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
    })
      .then((res) => console.log(res.json()))
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
        this.loadingCompleted = true
        
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

  // Удаление подразделения
  async deleteSubDepartment(subDepartmentID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/subdepartments/' + subDepartmentID
    const token = this.authService.getToken()
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
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
  async createMember(name, card, subdepartment, student) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members'
    const token = this.authService.getToken()
    const data = {
      name: name,
      card: card,
      is_student: student,
      subdepartment_id: subdepartment
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

  // Удаление участников из профсоюза
  async deleteMember(membersID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members'
    const token = this.authService.getToken()
    const data = {
      members: membersID
    }
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
      body: JSON.stringify(data),
    })
      .then((res) => console.log(res.json()))
  }

  // Редактирование участника профсоюза
  async editMember(name, card, subdepartment, student, memberID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members/'+memberID
    const token = this.authService.getToken()
    const data = {
      name: name,
      card: card,
      is_student: student,
      subdepartment_id: subdepartment
    }

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
      body: JSON.stringify(data),
    })
      .then((res) => console.log(res.json()))
  }

  // Получение списка пользователей
  async getUsers() {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/users'
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
        this.users = data
        this.users$.next(this.users);
        return data
      }
      )
  }


  // Создание пользователя
  async createUser(username, login, password) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/users/register'
    const token = this.authService.getToken()
    const data = {
      user_name: username,
      login: login,
      password: password,
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

  // Редактирование пользователя

  // Удаление пользователей
  async deleteUser(userID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/users/'+userID
    const token = this.authService.getToken()

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
    })
      .then((res) => console.log(res.json()))
  }

  // Получение ролей

  async getRoles() {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/users/roles'
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
        this.roles = data
        this.roles$.next(this.roles);
        return data
      }
      )
  }



}
