import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  action$ = new Subject<string>()
  stateOpen$ = new Subject<boolean>()
  modalTitle$ = new Subject<string>()
  data$ = new Subject<any>()
  type$ = new Subject<any>()


  constructor() { }
}
