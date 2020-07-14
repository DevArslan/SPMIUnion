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

  titleForDeleteModal: string = ''

  selectedMemberId: number
  selectedMembersId: number[] = []
  selectedMembersId2: number[] = []

  membersCountForEdit: boolean = false
  selectAllMembers(event) {
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      element.checked = true
      this.selectedMembersId.push(Number(element.value))
    }
    console.log(this.selectedMembersId)
    this.api.selectedMembersId$.next(this.selectedMembersId)
    event.stopPropagation()
  }

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
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      element.checked = false
    }

    this.titleForDeleteModal = 'Удалить участника'
    this.api.titleForDeleteModal$.next(this.titleForDeleteModal)
    this.api.selectedMemberId$.next(this.selectedMemberId)

    event.stopPropagation()
  }
  selectMembersByCheckbox(event) {
    let flag = 0
    const selectedCheckbox = event.currentTarget.value
    if (event.currentTarget.checked == true) {
      event.currentTarget.parentNode.parentNode.classList.add('selectedRow')

    } else {
      event.currentTarget.parentNode.parentNode.classList.remove('selectedRow')
    }



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


    this.titleForDeleteModal = 'Удалить участников'
    this.api.titleForDeleteModal$.next(this.titleForDeleteModal)
    this.api.selectedMembersId$.next(this.selectedMembersId)

    event.stopPropagation()
  }

  ngOnInit(): void {


  }



}