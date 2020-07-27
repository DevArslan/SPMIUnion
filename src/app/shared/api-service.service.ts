import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../CONFIG';
import { STORAGE_KEY } from '../CONFIG';
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private authService: AuthService, private http: HttpClient) { }
  selectedDepartment: string;
  departments: any;
  members: {}[];
  roles: [];
  users: [];
  loadingCompleted: boolean;
  membersAKPS: any;
  stats: any;

  selectedDepartment$ = new Subject<{}>();
  users$ = new Subject<any>();
  departments$ = new Subject<any>();
  members$ = new Subject<any>();
  roles$ = new Subject<any>();
  postData$ = new Subject<{}[]>();
  loadingCompleted$ = new Subject<{}>();
  membersAKPS$ = new Subject<any>();
  preloader$ = new Subject<boolean>();
  stats$ = new Subject<any>();
  departmentForEditModal$ = new BehaviorSubject(undefined);
  titleForDeleteModal$ = new Subject<string>();
  subdepartments$ = new Subject<any>()

  user$ = new Subject<any>()
  member$ = new Subject<any>()
  createMember$ = new Subject<any>()
  editMember$ = new Subject<any>()
  deleteMember$ = new Subject<any>()
  structure$ = new Subject<any>()
  subdepartment$ = new Subject<any>()
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

    /* NOTE: Примерно так выглядит более корректный подход. */
    this.http.get(BASE_URL + 'departments').subscribe(
      (res) => {
        this.departments$.next(res['departments']);
        this.departments = res['departments']
        return res['departments']
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


    this.http.get(BASE_URL + 'departments/' + departmentID).subscribe(
      (res) => {
        return res
        // this.departments$.next(res['departments']);
      },
      (err) => this.departments$.next(err)
    );
  }

  // Создание структуры
  async createDepartment(title, proforg) {

    const data = {
      title: title,
      proforg: proforg,
    };

    this.http.post(BASE_URL + 'departments', data).subscribe(
      (res) => {
        this.structure$.next(res)
        this.responseOK.next("Подразделение успешно создано")
      },
      (err) => {
        this.structure$.next(err)
      }
    );
  }

  // Удаление структуры
  async deleteDepartment(departmentID) {
    console.log('DELETE')
    this.http.delete(BASE_URL + 'departments/' + departmentID).subscribe(
      (res) => {
        
        this.structure$.next(res)
        
      },
      (err) => {
  
        this.structure$.next(err)
        
      }
    );

  }

  // Редактирование структуры
  async editStructure(structureName, proforgName, departmentID) {

    const data = {
      title: structureName,
      proforg: proforgName,
    };

    this.http.put(BASE_URL + 'departments/' + departmentID, data).subscribe(
      (res) => {
        this.structure$.next(res)
      },
      (err) => {
        this.structure$.next(err)
      }
    );
  }

  // Получение списка подразделений
  async getSubDepartments() {

    this.http.get(BASE_URL + 'subdepartments').subscribe(
      (res) => {
        this.loadingCompleted = true;
        this.subdepartments$.next(res)
        // this.departments$.next(res['departments']);
      },
      (err) => this.subdepartments$.next(err)
    );
  }

  // Создать подразделение
  async createSubDepartment(title, departmentID) {

    const data = {
      title: title,
      head_department_id: departmentID,
    };

    this.http.post(BASE_URL + 'subdepartments', data).subscribe(
      (res) => {
        this.subdepartment$.next(res)
      },
      (err) => {
        this.subdepartment$.next(err)
      }
    );



  }

  // Изменение подразделения
  async editSubDepartment(title, departmentID, subDepartmentID) {

    const data = {
      title: title,
      head_department_id: departmentID,
    };

    this.http.put(BASE_URL + 'subdepartments/' + subDepartmentID, data).subscribe(
      (res) => {
        this.subdepartment$.next(res)
      },
      (err) => {
        this.subdepartment$.next(err)
      }
    );


  }

  // Удаление подразделения
  async deleteSubDepartment(subDepartmentID) {

    this.http.delete(BASE_URL + 'subdepartments/' + subDepartmentID).subscribe(
      (res) => {
        this.subdepartment$.next(res)
      },
      (err) => {
        this.subdepartment$.next(err)

      }
    );
  }

  // Получение списка участников
  // async getMembers() {

  //   const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members';

  //   return fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.members = data;
  //       this.members$.next(this.members);

  //       return data;
  //     });
  // }

  // Пагинация для таблицы участников
  async getMembersByPage(rows, page, query) {
    this.http.get(BASE_URL + 'members?rows=' + rows + '&page=' + page + '&query=' + query).subscribe(
      (res) => {
        console.log(res)
        this.members$.next(res)
      },
      (err) => this.members$.next(err)
    );
  }

  // Получение списка участников в базе АКПС
  async getMembersAKPS(query) {
    this.preloader$.next(true);
    this.http.get(BASE_URL + 'members/akps?query=' + query).subscribe(
      (res) => {
        console.log(res)
        this.preloader$.next(false);
        this.membersAKPS$.next(res)
      },
      (err) => this.membersAKPS$.next(err)
    );
  }

  // Создание нового участника профсоюза
  async createMember(name, card, subdepartment, student) {

    const data = {
      name: name,
      card: card,
      is_student: student,
      subdepartment_id: subdepartment,
    };

    this.http.post(BASE_URL + 'members', data).subscribe(
      (res) => {
        console.log(res)
        this.createMember$.next(res)
      },
      (err) => {
        this.createMember$.next(err)
      }
    );
  }
  // Удаление участников из профсоюза
  async deleteMember(membersID) {

    const data = {
      members: membersID,
    };

    let token

    if(JSON.parse(sessionStorage.getItem(STORAGE_KEY)) != null){
      token = JSON.parse(sessionStorage.getItem(STORAGE_KEY)).token
    }else{
      token = JSON.parse(localStorage.getItem(STORAGE_KEY)).token
    }


    const url = 'https://digital.spmi.ru/profsouz_test/api/v1/members';


    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
      body: JSON.stringify(data),
    }).then((res) => {
      this.deleteMember$.next(res.json())
      return res.json();
    });
  }

  // Редактирование участника профсоюза
  async editMember(name, card, subdepartment, student, memberID) {

    const data = {
      name: name,
      card: card,
      is_student: student,
      subdepartment_id: subdepartment,
    };

    this.http.put(BASE_URL + 'members/' + memberID, data).subscribe(
      (res) => {
        this.responseOK.next('Участник успешно изменен')
        this.editMember$.next(res)
      },
      (err) => {
        this.editMember$.next(err)
      }
    );

  }

  // Активация участников в профсоюзе
  async activateMembers(membersID) {

    const data = {
      members: membersID,
    };

    this.http.patch(BASE_URL + 'members/enter', data).subscribe(
      (res) => {
        console.log(res)
        this.member$.next(res)
      },
      (err) => {
        this.member$.next(err)
      }
    );
  }
  // Блокировка участников в профсоюзе
  async blockMembers(membersID) {

    const data = {
      members: membersID,
    };

    this.http.patch(BASE_URL + 'members/quit', data).subscribe(
      (res) => {
        console.log(res)
        this.member$.next(res)
      },
      (err) => {
        this.member$.next(err)
      }
    );
  }

  // Получение списка пользователей
  async getUsers() {

    this.http.get(BASE_URL + 'users').subscribe(
      (res) => {
        this.users$.next(res)
      },
      (err) => {
        this.users$.next(err)
      }
    );

  }

  // Создание пользователя
  async createUser(username, login, password) {

    const data = {
      user_name: username,
      login: login,
      password: password,
    };

    this.http.post(BASE_URL + 'users/register', data).subscribe(
      (res) => {
        this.user$.next(res)
      },
      (err) => {
        this.user$.next(err)
      }
    );
  }

  // Редактирование пользователя
  async editUser(userID, role) {

    this.http.patch(BASE_URL + 'users/change_role/' + userID + '?role=' + role, '').subscribe(
      (res) => {
        this.user$.next(res)
      },
      (err) => {
        this.user$.next(err)
      }
    );


  }
  // Удаление пользователей
  async deleteUser(userID) {

    this.http.delete(BASE_URL + 'users/' + userID).subscribe(
      (res) => {
        this.user$.next(res)
      },
      (err) => {
        this.user$.next(err)
      }
    );

  }

  // Получение списка ролей
  async getRoles() {

    this.http.get(BASE_URL + 'users/roles').subscribe(
      (res) => {
        this.roles$.next(res)
      },
      (err) => {
        this.roles$.next(err)
      }
    );
  }

  // Скачивание данных участников профсоюза в формате excel
  async downloadExcel() {

    this.http.get<Blob>(BASE_URL + 'members/xlsx', { observe: 'response', responseType: 'blob' as 'json' }).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.download = `Выгрузка_участники_профсоюза_${new Date().getDate()}_${new Date().getMonth() + 1}_${new Date().getFullYear()}.xlsx`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
      },
      (err) => {
        this.error.next(err)
      }
    );
  }

  // Скачивание данных участников профсоюза в структуре в формате excel
  async downloadExcelDepartment(depID, title) {

    this.http.get<Blob>(BASE_URL + 'departments/xlsx/' + depID, { observe: 'response', responseType: 'blob' as 'json' }).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.download = `Выгрузка_участники_профсоюза_${new Date().getDate()}_${
          new Date().getMonth() + 1
          }_${new Date().getFullYear()}_${title}.xlsx`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
      },
      (err) => {
        this.error.next(err)
      }
    );
  }

  // Скачивание данных участников профсоюза в подразделении в формате excel
  async downloadExcelSubDepartment(subID, title) {

    this.http.get<Blob>(BASE_URL + 'departments/subdepartments/xlsx/' + subID, { observe: 'response', responseType: 'blob' as 'json' }).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.download = `Выгрузка_участники_профсоюза_${new Date().getDate()}_${
          new Date().getMonth() + 1
          }_${new Date().getFullYear()}_${title}.xlsx`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
      },
      (err) => {
        this.error.next(err)
      }
    );
  }

  // Статистика по датам
  async getStats(fromData, toData, subID) {

    const data = {
      subdepartments: subID,
      from_date: fromData,
      to_date: toData,
    };

    if (subID.length != 0) {
      this.http.post(BASE_URL + 'stats', data).subscribe(

        (res) => {
          this.stats$.next(res);
        },
        (err) => this.stats$.next(err)
      );
    }
    else {
      this.stats = { stats: [] };
      this.stats$.next(this.stats);
    }
  }
}
