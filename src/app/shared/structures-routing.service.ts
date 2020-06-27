import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StructuresRoutingService {


  postData$ = new Subject<string>();


  constructor() { }
}
