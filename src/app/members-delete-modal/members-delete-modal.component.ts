import { Component, OnInit , Output, EventEmitter} from '@angular/core';
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
    this.apiServiceService.selectedMemberId$.subscribe((id)=>{
      this.memberID.length = 0
      this.memberID.push(id)
      console.log(this.memberID)
    })
    this.apiServiceService.titleForDeleteModal$.subscribe((title)=>{
      this.title = title
    })
  }
  closeModal(){
    const modal = document.getElementById('membersDelModal')
    modal.style.display = "none";
    this.error = ''
  }

  async deleteMember(){
    this.membersID.length = 0
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      if(element.checked){
        this.membersID.push(Number(element.value))
      }
    }
    
    if(this.membersID.length == 0){
      const promise = await this.apiServiceService.deleteMember(this.memberID)
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      if(promise.error){
        this.error = promise.message
        this.apiServiceService.error.next(String(this.error))
      }else{
        this.childEvent.emit();
        const emptyArray = []
        this.apiServiceService.selectedMembersId$.next(emptyArray)
        this.apiServiceService.responseOK.next('Участник успешно удален')
        this.closeModal()
        
      }
      
    }else if(this.memberID){
      const promise = await this.apiServiceService.deleteMember(this.membersID)
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      if(promise.error){
        this.error = promise.message
        this.apiServiceService.error.next(String(this.error))
      }else{
        this.childEvent.emit();
        this.apiServiceService.selectedMemberId$.next(undefined)
        this.apiServiceService.responseOK.next('Участники успешно удалены')
        this.closeModal()
        
      }
    }


    
  }
}
