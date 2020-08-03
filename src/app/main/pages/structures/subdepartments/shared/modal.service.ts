import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  action$ = new Subject<string>()
  stateOpen$ = new Subject<boolean>()
  modalTitle$ = new Subject<string>()
  data$ = new Subject<any>()

  constructor() { }
}
