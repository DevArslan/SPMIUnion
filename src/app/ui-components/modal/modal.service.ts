import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalParams = new Subject<{title:string, action:string}>()

  constructor() { }

}
