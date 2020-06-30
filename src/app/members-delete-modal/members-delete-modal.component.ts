import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { Input } from "@angular/core";

@Component({
  selector: 'app-members-delete-modal',
  templateUrl: './members-delete-modal.component.html',
  styleUrls: ['./members-delete-modal.component.scss']
})
export class MembersDeleteModalComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService) { }
  membersID: number[] = []
  ngOnInit(): void {
  }
  closeModal(){
    const modal = document.getElementById('membersDelModal')
    modal.style.display = "none";
  }

  deleteMember(){
    this.membersID.length = 0
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    checkboxes.forEach(element => {
      if(element.checked){
        this.membersID.push(element.value)
      }
    });
    console.log(this.membersID)
    this.apiServiceService.deleteMember(this.membersID)

  }
}
