import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { async } from '@angular/core/testing';
import { of } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService) { }

  username: string = ''
  // data: {id: string, name: string, structure: string, status: string}[] = [
  //   {'id':'1', 'name':'Ivan','structure':'Gorniy','status':'admin'},
  //   {'id':'2', 'name':'Ivan','structure':'Gorniy','status':'admin'},
  //   {'id':'3', 'name':'Ivan','structure':'Gorniy','status':'admin'},
  //   {'id':'4', 'name':'Petya','structure':'FPMS','status':'admin'}
  // ]
  data: {}[] = []

  showAddModal(){
    const modal = document.getElementById('membersAddModal')
    modal.style.display = "block";
  }
  showEditModal(){
    const modal = document.getElementById('membersEditModal')
    modal.style.display = "block";
  }
  showDelModal(){
    const modal = document.getElementById('membersDelModal')
    modal.style.display = "block";
  }

  getMembersData(){
    return  this.apiServiceService.getMembers()
  }

  ngOnInit():void {
    this.data = this.getMembersData()
    this.apiServiceService.members$.next(this.data);

    // this.data = await this.getMembersData()


  }


}
