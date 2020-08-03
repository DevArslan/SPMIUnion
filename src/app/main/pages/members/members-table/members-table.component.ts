import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiService } from "src/app/shared/api.service";
import { subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss']
})
export class MembersTableComponent implements OnInit {

  @Input() data: {}[] = []
  selectedAll: boolean =  true
  constructor(private api: ApiService) { }

  titleForDeleteModal: string = ''

  selectedMemberId: number
  selectedMembersId: number[] = []
  selectedMembersId2: number[] = []

  checkboxes: number
  checkedCheckboxes: number

  membersCountForEdit: boolean = false
  selectAllMembers(event) {
    this.selectedMembersId.length = 0
    this.selectedAll = true
    this.checkedCheckboxes = 0
    const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    if (selectAllCheckbox.checked == true) {
      for (let index = 0; index < checkboxes.length; index++) {
        const element = <HTMLInputElement>checkboxes[index];
        element.checked = true
        element.parentElement.parentElement.classList.add('selectedRow')
        this.selectedMembersId.push(Number(element.value))
        this.checkedCheckboxes += 1
      }
    } else {
      for (let index = 0; index < checkboxes.length; index++) {
        const element = <HTMLInputElement>checkboxes[index];
        element.checked = false
        element.parentElement.parentElement.classList.remove('selectedRow')
        this.selectedMembersId.length = 0
      }
      this.checkedCheckboxes = 0
    }

    console.log(this.selectedMembersId)
    this.api.selectedMembersId$.next(this.selectedMembersId)
    event.stopPropagation()
  }

  selectMember(event) {
    this.selectedAll = false
    const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
    selectAllCheckbox.checked = false
    const rows = document.querySelectorAll('.membersTableDataRow')
    rows.forEach(element => {this.checkedCheckboxes = 0
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
    this.checkedCheckboxes = 1
    if(this.checkedCheckboxes == 1 || this.checkedCheckboxes == 0){
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      this.selectedAll = true
    }
    event.stopPropagation()
  }
  selectMembersByCheckbox(event) {
    this.checkedCheckboxes = 0
    const selectedCheckbox = event.currentTarget.value
    if (event.currentTarget.checked == true) {
      event.currentTarget.parentNode.parentNode.classList.add('selectedRow')
    } else if (event.currentTarget.parentNode.parentNode.id != 'selectedMember') {
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      event.currentTarget.parentNode.parentNode.classList.remove('selectedRow')
    }
    this.selectedMembersId.length = 0
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      if (element.checked) {
        this.checkedCheckboxes +=1
        this.selectedMembersId.push(Number(element.value))
      }
    }

    if(this.checkedCheckboxes > 1){
      this.selectedAll = false
    }else if(this.checkedCheckboxes == 1 || this.checkedCheckboxes == 0){
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      this.selectedAll = true
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