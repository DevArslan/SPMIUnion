import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";


@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss']
})
export class MembersTableComponent implements OnInit {

  @Input() data: {}[] = []

  constructor(private api: ApiServiceService) { }

  selectedMemberId:number

  

  selectMember(event){
    const rows = document.querySelectorAll('.membersTableDataRow')
    rows.forEach(element => {
      element.classList.remove('selectedRow')
      element.id = null
    });
    if(this.selectedMemberId == event.currentTarget.dataset.memberId){
      event.currentTarget.classList.remove('selectedRow')
      this.selectedMemberId = undefined
      event.currentTarget.id = null
    }else{
      event.currentTarget.classList.add('selectedRow')
      event.currentTarget.id = 'selectedMember'
      this.selectedMemberId = event.currentTarget.dataset.memberId
    }
    this.api.selectedMemberId$.next(this.selectedMemberId)
    event.stopPropagation()
  }

  ngOnInit(): void {


  }



}
