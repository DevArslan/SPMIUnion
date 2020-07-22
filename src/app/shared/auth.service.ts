import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/profile';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/* NOTE: Лучше вынести в отдельный файл конфига (например как сейчас я сделал) */
import { BASE_URL, STORAGE_KEY } from '../CONFIG';

/*  NOTE:
  Сервис должен либо предоставлять данные компонентам (то есть работать как некий общий state)
  Либо позволять взаимодействовать компонентам между собой (представляя собой некий канал для взаимодействия)
  Либо инкапсулировать какую-то общую для разных компонентов бизнес-логику, задачи и тп.
  До правок сервис больше был похож на набор функций без конкретно обозначенной логики как мне кажется.
*/
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUserObservable: Observable<User>;
  /* Как раз тот случай, когда полезно использовать строгую типизацию*/
  public currentUser: User;
  loginData: User;
  token: string = '';

  /* NOTE: Обрати внимание, что в Angular есть встроенный HttpClient, который возвращает
  Observable вместо Promise. Это несколько другой подход, связанный с реактивным программированием.
  Почитай про Observable, Subject и rxjs вообще*/
  constructor(private http: HttpClient) {
    /* На старте приложения получаем начальное состояние */
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem(STORAGE_KEY))
    );
    this.currentUserObservable = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUser;
  }

  public set currentUserValue(value) {
    this.currentUser = value;
    this.currentUserSubject.next(value);
  }

  login(username: string, password: string, remember?: boolean) {
    /* Кстати можно и лучше вот так кодировать (без дополнительных импортов) */
    const utf8_info = encodeURI(username + ':' + password);
    const hash = btoa(utf8_info);

    return (
      this.http
        /* Единственный раз, когда нужно указать хэдер. В остальных случаях лучше использовать Interceptor */
        .get<any>(BASE_URL + 'users/login', {
          headers: { Authorization: 'Basic ' + hash },
        })
        .pipe(
          map((user) => {
            // Если результат успешный, то считаем, что юзер залогинился
            if (user) {
              // тогда и сохраняем юзера либо в локал сторэдж, либо в session
              if (remember) {
                /* Токен отдельно хранить думаю нет смысла */
                user.token = hash;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
              } else {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
              }
              this.currentUserValue = user; // Возможно типы данных не совпадут
            }

            return user;
          })
        )
    );
  }

  logout() {
    // Удаляем все данные
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    this.currentUserValue = null;
  }

  /* С маленькой буквы */
  isAuthenticated() {
    /* Теперь эта функция записывается гораздо проще */
    return Boolean(this.currentUser);
  }

  /* NOTE: Теперь это logout().
    Роутер в сервисе лушче не использовать, 
    а перенести эту логику в компонент
  */
  // quit(){
  //   sessionStorage.removeItem('jsonData')
  //   sessionStorage.removeItem('token')
  //   localStorage.removeItem('jsonData')
  //   localStorage.removeItem('token')
  //   this.router.navigate(['auth']);
  // }
}
