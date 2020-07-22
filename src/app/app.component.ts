import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SPMIUnion';

  /* NOTE: getDepartments() должен выполняться только в защищенном модуле, т.е. его
  нужно вызвать в main.component */
  constructor() {}

  /* NOTE: Неиспользуемый код лучше убирать */
  // ngOnChanges(): void {

  // }
}
