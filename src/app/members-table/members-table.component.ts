import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";
import { subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss']
})
export class MembersTableComponent implements OnInit {

  @Input() data: {}[] = []
  selectedAll: boolean =  true
  constructor(private api: ApiServiceService) { }

  titleForDeleteModal: string = ''

  selectedMemberId: number
  selectedMembersId: number[] = []
  selectedMembersId2: number[] = []



  membersCountForEdit: boolean = false
  selectAllMembers(event) {
    this.selectedMembersId.length = 0
    this.selectedAll = true
    const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    if (selectAllCheckbox.checked == true) {
      for (let index = 0; index < checkboxes.length; index++) {
        const element = <HTMLInputElement>checkboxes[index];
        element.checked = true
        element.parentElement.parentElement.classList.add('selectedRow')
        this.selectedMembersId.push(Number(element.value))
      }
    } else {
      for (let index = 0; index < checkboxes.length; index++) {
        const element = <HTMLInputElement>checkboxes[index];
        element.checked = false
        element.parentElement.parentElement.classList.remove('selectedRow')
        this.selectedMembersId.length = 0
      }
    }

    console.log(this.selectedMembersId)
    this.api.selectedMembersId$.next(this.selectedMembersId)
    event.stopPropagation()
  }

  selectMember(event) {
    this.selectedAll = false
    const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
    selectAllCheckbox.checked = false
    console.log('NOcheckbox')
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
    console.log('checkbox')
    const selectedCheckbox = event.currentTarget.value
    if (event.currentTarget.checked == true) {
      event.currentTarget.parentNode.parentNode.classList.add('selectedRow')


    } else if (event.currentTarget.parentNode.parentNode.id != 'selectedMember') {
      this.selectedAll = false
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      event.currentTarget.parentNode.parentNode.classList.remove('selectedRow')
    }
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
    this.api.selectedAllmembers.subscribe((data)=>{
      this.selectedAll = data
      console.log(this.selectedAll)
    })

  }



}