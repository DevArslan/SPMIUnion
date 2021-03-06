import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Input } from "@angular/core";
import { ApiService } from "src/app/shared/api.service";
import { subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss']
})
export class MembersTableComponent implements OnInit {

  @Input() membersCount: number
  @Input() data: {}[] = []
  @ViewChild('selectAllCheckbox') selectAllCheckbox: ElementRef;
  selectedAll: boolean = true
  constructor(private api: ApiService) { }

  titleForDeleteModal: string = ''

  selectedMemberId: number
  selectedMembersId: number[] = []
  selectedMembersId2: number[] = []
  selectedMembersIdAll: number[] = []

  checkboxes: number
  checkedCheckboxes: number

  membersCountForEdit: boolean = false
  selectAllMembers(event) {
    this.selectedMembersId.length = 0
    this.selectedAll = true
    this.checkedCheckboxes = 0
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      if (element.checked == true) {
        this.checkedCheckboxes += 1
      }
    }
    console.log(this.checkedCheckboxes)
    if (checkboxes.length != this.checkedCheckboxes) {
      for (let index = 0; index < checkboxes.length; index++) {
        let exist = false
        const element = <HTMLInputElement>checkboxes[index];
        element.checked = true
        element.parentElement.parentElement.classList.add('selectedRow')
        this.selectedMembersId.push(Number(element.value))
          this.selectedMembersIdAll.push(Number(element.value))
      }
    } else {
      for (let index = 0; index < checkboxes.length; index++) {
        const element = <HTMLInputElement>checkboxes[index];
        element.checked = false
        element.parentElement.parentElement.classList.remove('selectedRow')
        this.selectedMembersIdAll.forEach((id, index) => {
          if (id == Number(element.value)) {
            this.selectedMembersIdAll.splice(index, 1)
          }
        });
        this.selectedMembersId.length = 0
      }
      this.checkedCheckboxes = 0
    }
    this.api.selectedMembersIdAll$.next(this.selectedMembersIdAll)
    this.api.selectedMembersId$.next(this.selectedMembersId)
    // this.selectAllCheckbox.nativeElement.checked = false
    event.stopPropagation()
  }

  selectMember(event) {
    this.selectedAll = false
    this.selectedMemberId = undefined
    this.selectAllCheckbox.nativeElement.checked = false
    const rows = document.querySelectorAll('.membersTableDataRow')
    rows.forEach(element => {
      this.checkedCheckboxes = 0
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
    this.api.selectedMembersIdAll$.next([])
    this.checkedCheckboxes = 1
    if (this.checkedCheckboxes == 1 || this.checkedCheckboxes == 0) {

      this.selectAllCheckbox.nativeElement.checked = false
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

      this.selectAllCheckbox.nativeElement.checked = false
      event.currentTarget.parentNode.parentNode.classList.remove('selectedRow')
    }
    this.selectedMembersId.length = 0
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      if (element.checked) {
        this.checkedCheckboxes += 1
        this.selectedMembersId.push(Number(element.value))
        let index = this.selectedMembersIdAll.indexOf(Number(element.value))
        if (index == -1) {
          this.selectedMembersIdAll.push(Number(element.value))
        }

      } else {
        let index = this.selectedMembersIdAll.indexOf(Number(element.value))
        if (index > -1) {
          this.selectedMembersIdAll.splice(index, 1)
        }
      }
    }
    this.api.selectedMembersIdAll$.next(this.selectedMembersIdAll)
    if (this.checkedCheckboxes > 1) {
      this.selectedAll = false
    } else if (this.checkedCheckboxes == 1 || this.checkedCheckboxes == 0) {

      this.selectAllCheckbox.nativeElement.checked = false
      this.selectedAll = true
    }

    this.titleForDeleteModal = 'Удалить участников'
    this.api.titleForDeleteModal$.next(this.titleForDeleteModal)
    this.api.selectedMembersId$.next(this.selectedMembersId)

    if (this.selectedMembersId.length == 1) {
      this.selectedMemberId = this.selectedMembersId[0]
      this.api.selectedMemberId$.next(this.selectedMemberId)
    } else {
      this.selectedMemberId = undefined
      this.api.selectedMemberId$.next(this.selectedMemberId)
    }
    event.stopPropagation()
  }

  ngOnInit(): void {

    this.api.selectedAllmembers.subscribe((data) => {
      this.selectedAll = data
    })
    this.api.selectedMembersIdAll$.subscribe((ids) => {
      this.selectedMembersIdAll = ids
      console.log(this.selectedMembersIdAll)
    })
  }

  ngOnChanges(): void {
    // this.selectAllCheckbox.nativeElement.classList.remove('selectNotAllCheckbox')
  }
}