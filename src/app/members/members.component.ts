import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor() { }

  username: string = ''
  data: {id: string, name: string, structure: string, status: string}[] = [
    {'id':'1', 'name':'Ivan','structure':'Gorniy','status':'admin'},
    {'id':'2', 'name':'Ivan','structure':'Gorniy','status':'admin'},
    {'id':'3', 'name':'Ivan','structure':'Gorniy','status':'admin'},
    {'id':'4', 'name':'Petya','structure':'FPMS','status':'admin'}
  ]


  ngOnInit(): void {

  }
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

}
