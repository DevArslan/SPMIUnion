import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
@Component({
  selector: 'app-users-delete-modal',
  templateUrl: './users-delete-modal.component.html',
  styleUrls: ['./users-delete-modal.component.scss']
})
export class UsersDeleteModalComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService) { }
  userID: any
  error: ''
  closeModal(){
    const modal = document.getElementById('usersDelModal')
    modal.style.display = "none";
  }

  async deleteMember(){
    // const checkboxes = document.getElementsByClassName('userCheckbox')

    // for (let index = 0; index < checkboxes.length; index++) {
    //   const element = <HTMLInputElement>checkboxes[index];
    //   if(element.checked){
    //     this.userID = Number(element.value)
    //   }
    // }
    // this.userID =  this.apiServiceService.selectedUserId$.getValue()
    // console.log(this.userID)

    const promise = await this.apiServiceService.deleteUser(this.userID)
    if(promise.error){
      this.error = promise.message
    }else{
      await this.apiServiceService.getUsers()
      this.closeModal()
    }
    
    
  }

  ngOnInit(): void {
    this.apiServiceService.selectedUserId$.subscribe((id)=>{
      this.userID = id
    })
  }

}
