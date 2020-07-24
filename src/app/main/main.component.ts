import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/shared/api-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(public snackBar: MatSnackBar, public api: ApiServiceService) {}

  ngOnInit(): void {
    /*NOTE: Теперь все правильно - если юзер залогинился и попал сюда, то вызывается метод*/
    this.api.getDepartments();

    /* NOTE: Перед продом console.log надо будет убрать или закомментить */
    this.api.error.subscribe((error) => {
      this.snackBar.open(error, 'OK', {
        duration: 2000,
        panelClass: ['mat-warn', 'mat-warn'],
      });
    });

    this.api.responseOK.subscribe((response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000,
        panelClass: ['mat-primary'],
      });
    });
  }
}
