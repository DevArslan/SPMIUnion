import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../CONFIG';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private authService: AuthService, private http: HttpClient) {}
  selectedDepartment: string;
  departments: any;
  members: {}[];
  roles: [];
  users: [];
  loadingCompleted: boolean;
  membersAKPS: any;
  stats: any;

  users$ = new Subject<{}[]>();
  departments$ = new Subject<{}[]>();
  members$ = new Subject<{}[]>();
  roles$ = new Subject<[]>();
  postData$ = new Subject<{}[]>();
  loadingCompleted$ = new Subject<{}>();
  membersAKPS$ = new Subject<{}[]>();
  preloader$ = new Subject<boolean>();
  stats$ = new Subject<[]>();
  departmentForEditModal$ = new BehaviorSubject(undefined);
  titleForDeleteModal$ = new Subject<string>();

  // Observable member data
  selectedMemberId$ = new Subject<number>();
  selectedMembersId$ = new Subject<number[]>();

  // Observable user data
  selectedUserId$ = new Subject<number>();

  error = new Subject<string>();
  responseOK = new Subject<string>();

  selectedAllmembers = new Subject<boolean>();
  // Получение данных о структурах
  getDepartments() {
    /*     const url = 'https://digital.spmi.ru/profsouz_test/api/v1/departments';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.departments = data.departments;
        this.departments$.next(this.departments);
      }); */

    /* NOTE: Примерно так выглядит более корректный подход. */
    this.http.get(BASE_URL + 'departments').subscribe(
      (res) => {
        this.departments$.next(res['departments']);
      },
      (err) => this.departments$.next(err)
    );

    /*
    NOTE:
    При этом если ты хочешь иметь общий стейт, то в этом сервисе для текущего Subject
    нужно создать объект методом .asObservable() и подписаться на него в компоненте.
    Также можно подписаться на результат выполнения в компоненте напрямую.
    Тогда достаточно просто сделать return this.http ... и подписаться в компоненте опять же
    */
  }

  // TODO: Перейти полностью на HttpClient
  // Получение данных структрах по ID
  async getDepartmentById(departmentID) {
    const url =
      'https://digital.spmi.ru/profsouz_test/api/v1/departments/' +
      departmentID;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }
  // Создание структуры
  async createDepartment(title, proforg) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/departments';
    const data = {
      title: title,
      proforg: proforg,
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });
  }

  // Удаление структуры
  async deleteDepartment(departmentID) {
    const url =
      'https://digital.spmi.ru/profsouz_test/api/v1/departments/' +
      departmentID;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    });
  }

  // Редактирование структуры
  async editStructure(structureName, proforgName, departmentID) {
    const url =
      'https://digital.spmi.ru/profsouz_test/api/v1/departments/' +
      departmentID;

    const data = {
      title: structureName,
      proforg: proforgName,
    };

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });
  }

  // Получение списка подразделений
  async getSubDepartments() {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/subdepartments';

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.loadingCompleted = true;
        console.log('подразделения');

        return data;
      });
  }

  // Создать подразделение
  async createSubDepartment(title, departmentID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/subdepartments';

    const data = {
      title: title,
      head_department_id: departmentID,
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });
  }

  // Изменение подразделения
  async editSubDepartment(title, departmentID, subDepartmentID) {
    const url =
      'https://digital.spmi.ru/profsouz_test/api/v1/subdepartments/' +
      subDepartmentID;

    const data = {
      title: title,
      head_department_id: departmentID,
    };

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });
  }

  // Удаление подразделения
  async deleteSubDepartment(subDepartmentID) {
    const url =
      'https://digital.spmi.ru/profsouz_test/api/v1/subdepartments/' +
      subDepartmentID;

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    });
  }

  // Получение списка участников
  async getMembers() {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members';

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.members = data;
        this.members$.next(this.members);

        return data;
      });
  }

  // Пагинация для таблицы участников
  async getMembersByPage(rows, page, query) {
    const url =
      'https://digital.spmi.ru/profsouz_test/api/v1/members?rows=' +
      rows +
      '&page=' +
      page +
      '&query=' +
      query;

    console.log(rows, page);
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.members = data;
        this.members$.next(this.members);
        return data;
      });
  }

  // Получение списка участников в базе АКПС
  async getMembersAKPS(query) {
    const url =
      'https://digital.spmi.ru/profsouz_test/api/v1/members/akps?query=' +
      query;

    this.preloader$.next(true);
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.membersAKPS = data;
        this.membersAKPS$.next(this.membersAKPS);
        this.preloader$.next(false);
        return data;
      });
  }

  // Создание нового участника профсоюза
  async createMember(name, card, subdepartment, student) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members';

    const data = {
      name: name,
      card: card,
      is_student: student,
      subdepartment_id: subdepartment,
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch((error) => console.log(error));
  }

  // Удаление участников из профсоюза
  async deleteMember(membersID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members';

    const data = {
      members: membersID,
    };
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });
  }

  // Редактирование участника профсоюза
  async editMember(name, card, subdepartment, student, memberID) {
    const url =
      'https://digital.spmi.ru/profsouz_test/api/v1/members/' + memberID;

    const data = {
      name: name,
      card: card,
      is_student: student,
      subdepartment_id: subdepartment,
    };

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });
  }

  // Активация участников в профсоюзе
  async activateMembers(membersID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members/enter';

    const data = {
      members: membersID,
    };
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });
  }
  // Блокировка участников в профсоюзе
  async blockMembers(membersID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members/quit';

    const data = {
      members: membersID,
    };
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });
  }

  // Получение списка пользователей
  async getUsers() {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/users';

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.users = data;
        this.users$.next(this.users);
        return data;
      });
  }

  // Создание пользователя
  async createUser(username, login, password) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/users/register';

    const data = {
      user_name: username,
      login: login,
      password: password,
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });
  }

  // Редактирование пользователя
  async editUser(userID, role) {
    const url =
      'https://digital.spmi.ru/profsouz_test/api/v1//users/change_role/' +
      userID +
      '?role=' +
      role;

    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    });
  }
  // Удаление пользователей
  async deleteUser(userID) {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/users/' + userID;

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    });
  }

  // Получение ролей

  async getRoles() {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/users/roles';

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.roles = data;
        this.roles$.next(this.roles);
        return data;
      });
  }

  // Скачивание данных участников профсоюза в формате excel
  async downloadExcel() {
    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members/xlsx';

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = `Выгрузка_участники_профсоюза_${new Date().getDate()}_${
          new Date().getMonth() + 1
        }_${new Date().getFullYear()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  // Скачивание данных участников профсоюза в структуре в формате excel
  async downloadExcelDepartment(depID, title) {
    const url =
      'https://digital.spmi.ru/profsouz_test/api/v1/departments/xlsx/' + depID;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = `Выгрузка_участники_профсоюза_${new Date().getDate()}_${
          new Date().getMonth() + 1
        }_${new Date().getFullYear()}_${title}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  // Скачивание данных участников профсоюза в подразделении в формате excel
  async downloadExcelSubDepartment(subID, title) {
    const url =
      'https://digital.spmi.ru/profsouz_test/api/v1/departments/subdepartments/xlsx/' +
      subID;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = `Выгрузка_участники_профсоюза_${new Date().getDate()}_${
          new Date().getMonth() + 1
        }_${new Date().getFullYear()}_${title}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  // Статистика по датам
  async getStats(fromData, toData, subID) {
    let url = 'https://digital.spmi.ru/profsouz_test/api/v1/stats';

    const data = {
      subdepartments: subID,
      from_date: fromData,
      to_date: toData,
    };
    console.log(data);

    if (subID.length != 0) {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.stats = data;
          this.stats$.next(this.stats);
        });
    } else {
      this.stats = { stats: [] };
      console.log(this.stats);
      this.stats$.next(this.stats);
    }
  }
}
