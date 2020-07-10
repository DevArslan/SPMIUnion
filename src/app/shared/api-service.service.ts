import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service'
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private authService: AuthService) { }
  selectedDepartment: string
  departments: any
  members: {}[]
  roles: []
  users: []
  loadingCompleted: boolean
  membersAKPS: any
  stats: any
  // selectedUserId: any

  users$ = new Subject<{}[]>()
  departments$ = new Subject<{}[]>();
  members$ = new Subject<{}[]>();
  roles$ = new Subject<[]>();
  postData$ = new Subject<{}[]>();
  loadingCompleted$ = new Subject<{}>()
  membersAKPS$ = new Subject<{}[]>()
  preloader$ = new Subject<boolean>()
  stats$ = new Subject<[]>();


  // Observable member data
  selectedMemberId$ = new Subject<number>()
  selectedMembersId$ = new Subject<number[]>();

  // Observable user data
  selectedUserId$ = new BehaviorSubject(undefined)

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

  // Редактирование структуры
  async editStructure(structureName, proforgName, departmentID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/departments/' + departmentID
    const token = this.authService.getToken()
    const data = {
      title: structureName,
      proforg: proforgName,
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

  // Изменение подразделения
  async editSubDepartment(title, departmentID, subDepartmentID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/subdepartments/' + subDepartmentID
    const token = this.authService.getToken()
    const data = {
      title: title,
      head_department_id: departmentID,
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

  // Пагинация для таблицы участников
  async getMembersByPage(rows, page) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members?rows='+rows+'&page='+page
    const token = this.authService.getToken()
    console.log(rows,page)
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
        this.members = data
        this.members$.next(this.members);
        return data
      }
      )
  }

  // Получение списка участников в базе АКПС
  async getMembersAKPS(query) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members/akps?query=' + query
    const token = this.authService.getToken()
    this.preloader$.next(true)
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
    })
      .then((res) => res.json())
      .then(data => {
        console.log(data)
        this.membersAKPS = data
        this.membersAKPS$.next(this.membersAKPS);
        this.preloader$.next(false)
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
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json()
        }

      })
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
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members/' + memberID
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

  // Активация участников в профсоюзе
  async activateMembers(membersID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members/enter'
    const token = this.authService.getToken()
    const data = {
      members: membersID
    }
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
      body: JSON.stringify(data),
    })
      .then((res) => console.log(res.json()))
  }
  // Блокировка участников в профсоюзе
  async blockMembers(membersID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members/quit'
    const token = this.authService.getToken()
    const data = {
      members: membersID
    }
    return fetch(url, {
      method: 'PATCH',
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
  async editUser(userID,role) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1//users/change_role/'+userID+'?role='+role
    const token = this.authService.getToken()
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
    })
      .then((res) => console.log(res.json()))
  }
  // Удаление пользователей
  async deleteUser(userID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/users/' + userID
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

  // Скачивание данных участников профсоюза в формате excel
  async downloadExcel() {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members/xlsx'
    const token = this.authService.getToken()
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
    })
      .then((res) => res.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = `Выгрузка_участники_профсоюза_${new Date().getDate()}_${new Date().getMonth()+1}_${new Date().getFullYear()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      )
  }

  // Скачивание данных участников профсоюза в структуре в формате excel
  async downloadExcelDepartment(depID,title) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/departments/xlsx/'+depID
    const token = this.authService.getToken()
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
    })
      .then((res) => res.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = `Выгрузка_участники_профсоюза_${new Date().getDate()}_${new Date().getMonth()+1}_${new Date().getFullYear()}_${title}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      )
  }

   // Скачивание данных участников профсоюза в подразделении в формате excel
   async downloadExcelSubDepartment(subID,title) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/departments/subdepartments/xlsx/'+subID
    const token = this.authService.getToken()
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
    })
      .then((res) => res.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = `Выгрузка_участники_профсоюза_${new Date().getDate()}_${new Date().getMonth()+1}_${new Date().getFullYear()}_${title}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      )
  }

  // Статистика по датам
  async getStats(fromData, toData, subID) {
    let url = 'https://digital.spmi.ru/profsouz_test/api/v1/stats' + '?from_date=' + fromData + '&to_date=' + toData 
    
    subID.forEach(element => {
      url +='&subdepartment_id=' + element
    });
    
    
    const token = this.authService.getToken()
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
    })
      .then((res) => (res.json()))
      .then(data => {
        
        this.stats = data
        this.stats$.next(this.stats);
      }
      )
  }


}
