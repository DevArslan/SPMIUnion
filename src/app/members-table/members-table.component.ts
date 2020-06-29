import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";


@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss']
})
export class MembersTableComponent implements OnInit {

  // @Input() data: {}[] = []
  data: {}[] =[]
  constructor(private apiServiceService: ApiServiceService) { }

  ngOnInit(): void {
    this.apiServiceService.members$.subscribe((dataFromApi)=>{
      this.data =  dataFromApi.members
    })

  }



}
