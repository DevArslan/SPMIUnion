import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";


@Component({
  selector: 'app-structures',
  templateUrl: './structures.component.html',
  styleUrls: ['./structures.component.scss']
})
export class StructuresComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService) { }
  active: boolean = false;
  loadingCompleted: boolean = false;
  ngOnInit(): void {
    // this.apiServiceService.loadingCompleted$.subscribe(()=>{
    //   console.log(this.loadingCompleted)
    //   this.loadingCompleted = true
    //   console.log(this.loadingCompleted)
    // })
  }
  
  
  showModal(){
    this.active = !this.active
    console.log('asda')
  }

}
