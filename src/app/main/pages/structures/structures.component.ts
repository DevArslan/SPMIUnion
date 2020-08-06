import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/shared/api.service";


@Component({
  selector: 'app-structures',
  templateUrl: './structures.component.html',
  styleUrls: ['./structures.component.scss']
})



export class StructuresComponent implements OnInit {

  constructor(private apiServiceService: ApiService) { }
  active: boolean = false;
  loadingCompleted: boolean = false;
  data: {}[] = []
  ngOnInit(): void {
    // this.apiServiceService.getDepartments()
    // this.apiServiceService.departments$.subscribe(()=>{
    //   this.data = this.activatedRoute.snapshot.data['departments'];
    // })
    
  }
  
  showModal(){
    this.active = !this.active
  }

}
