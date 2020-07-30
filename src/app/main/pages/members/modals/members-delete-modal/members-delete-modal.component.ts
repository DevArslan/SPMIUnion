import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { Input } from "@angular/core";

@Component({
  selector: 'app-members-delete-modal',
  templateUrl: './members-delete-modal.component.html',
  styleUrls: ['./members-delete-modal.component.scss']
})
export class MembersDeleteModalComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  constructor(private apiServiceService: ApiServiceService) { }
  title: string
  membersID: number[] = []
  memberID: number[] = []
  error: string
  ngOnInit(): void {
    this.apiServiceService.selectedMemberId$.subscribe((id) => {
      this.memberID.length = 0
      this.memberID.push(id)
      console.log(this.memberID)
    })
    this.apiServiceService.titleForDeleteModal$.subscribe((title) => {
      this.title = title
    })
    this.apiServiceService.deleteMember$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.apiServiceService.error.next(String(this.error))
      } else {
        this.apiServiceService.responseOK.next('Участник успешно удален')
        this.childEvent.emit();
        this.closeModal()
      }
    })
  }
  closeModal() {
    const modal = document.getElementById('membersDelModal')
    modal.style.display = "none";
    this.error = ''
  }

  async deleteMember() {
    this.membersID.length = 0
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      if (element.checked) {
        this.membersID.push(Number(element.value))
      }
    }

    if (this.membersID.length == 0) {
      await this.apiServiceService.deleteMember(this.memberID)
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      const emptyArray = []
      this.apiServiceService.selectedMembersId$.next(emptyArray)

    } else if (this.memberID) {
      const promise = await this.apiServiceService.deleteMember(this.membersID)
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      this.apiServiceService.selectedMemberId$.next(undefined)

    }

  }
}
