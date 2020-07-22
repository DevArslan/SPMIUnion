import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* NOTE: Сервис нужно регистрировать в модуле и потом объявлять в конструкторе компонента  */
import { AuthService } from './shared/auth.service';
import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';

/* NOTE: Оцени насколько меньше и лаконичнее стал app.module */
@NgModule({
  declarations: [AppComponent],
  imports: [
    RoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
  ],
  /* NOTE: Регистрируем именно в общем модуле, потому что AuthService будет использоваться во всех модулях проекта */
  providers: [
    AuthService,
    /* NOTE: Очень полезная фича, добавляет ко всем запрос хэдер. Не работет с fetch, поэтому нужно полностью перейти на HttpCLient */
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
