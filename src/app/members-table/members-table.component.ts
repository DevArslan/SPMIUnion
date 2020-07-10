import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";
import { iif } from 'rxjs';


@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss']
})
export class MembersTableComponent implements OnInit {

  @Input() data: {}[] = []

  constructor(private api: ApiServiceService) { }

  selectedMemberId: number
  selectedMembersId: number[] = []
  selectedMembersId2: number[] = []

  selectMember(event) {
    const rows = document.querySelectorAll('.membersTableDataRow')
    rows.forEach(element => {
      element.classList.remove('selectedRow')
      element.id = null
    });
    if (this.selectedMemberId == event.currentTarget.dataset.memberId) {
      event.currentTarget.classList.remove('selectedRow')
      this.selectedMemberId = undefined
      event.currentTarget.id = null
      
    } else {
      event.currentTarget.classList.add('selectedRow')
      event.currentTarget.id = 'selectedMember'
      this.selectedMemberId = event.currentTarget.dataset.memberId
      // event.currentTarget.firstChild.firstChild.checked = true
    }

    

    this.api.selectedMemberId$.next(this.selectedMemberId)
    event.stopPropagation()
  }
  selectMembersByCheckbox(event) {
    let flag = 0
    const selectedCheckbox = event.currentTarget.value



    // if (this.selectedMembersId.length != 0) {
    //   this.selectedMembersId.forEach((item, index, object) => {

    //     if(selectedCheckbox != item){
    //       if (flag == 0) {
    //         flag = 1
    //         this.selectedMembersId.push(selectedCheckbox)
    //       }
    //     }else{
    //       object.splice(index, 1);
    //     }

    //   })
    // } else {
    //   this.selectedMembersId.push(selectedCheckbox)
    // }
    this.selectedMembersId.length = 0
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      if (element.checked) {
        this.selectedMembersId.push(Number(element.value))
      }
    }

    console.log(this.selectedMembersId)
    this.api.selectedMembersId$.next(this.selectedMembersId)

    event.stopPropagation()
  }

  ngOnInit(): void {


  }



}
