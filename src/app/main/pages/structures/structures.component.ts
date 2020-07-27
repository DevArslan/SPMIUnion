import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-structures',
  templateUrl: './structures.component.html',
  styleUrls: ['./structures.component.scss']
})



export class StructuresComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService,private activatedRoute: ActivatedRoute) { }
  active: boolean = false;
  loadingCompleted: boolean = false;
  data: {}[] = []
  ngOnInit(): void {
    this.apiServiceService.getDepartments()
    // this.apiServiceService.departments$.subscribe(()=>{
    //   this.data = this.activatedRoute.snapshot.data['departments'];
    // })
    
  }
  
  showModal(){
    this.active = !this.active
  }

}
