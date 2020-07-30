import { DeleteService } from "../shared/delete.service";
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { Input } from "@angular/core";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Output() childEvent = new EventEmitter();

  action: string = '';
  stateOpen: boolean = false;
  modalTitle: string;
  dataForModal: {}[] = [];

  title: string
  membersID: number[] = []
  memberID: number[] = []
  error: string

  constructor(private deleteService : DeleteService, private API : ApiServiceService) { }

  closeModal() {
    this.deleteService.stateOpen$.next(false)
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
      await this.API.deleteMember(this.memberID)
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      const emptyArray = []
      this.API.selectedMembersId$.next(emptyArray)

    } else if (this.memberID) {
      const promise = await this.API.deleteMember(this.membersID)
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      this.API.selectedMemberId$.next(undefined)

    }

  }

  ngOnInit(): void {
    this.deleteService.modalTitle$.subscribe((title)=>{
      console.log('asdasd')
      this.modalTitle = title;
    })
    this.deleteService.stateOpen$.subscribe((state)=>{
      this.stateOpen = state;
    })

    this.API.selectedMemberId$.subscribe((id) => {
      this.memberID.length = 0
      this.memberID.push(id)
      console.log(this.memberID)
    })
    this.API.titleForDeleteModal$.subscribe((title) => {
      this.title = title
    })
    this.API.deleteMember$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.API.error.next(String(this.error))
      } else {
        this.API.responseOK.next('Участник успешно удален')
        this.childEvent.emit();
        this.closeModal()
      }
    })

    
  }

}
