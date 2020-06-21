import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor() { }
  proxy: string
  url: string
  data: {id: string, name: string, structure: string, status: string}[] = [
    {'id':'1', 'name':'Ivan','structure':'Gorniy','status':'admin'},
    {'id':'2', 'name':'Ivan','structure':'Gorniy','status':'admin'},
    {'id':'3', 'name':'Ivan','structure':'Gorniy','status':'admin'},
    {'id':'4', 'name':'Petya','structure':'FPMS','status':'admin'}
  ]


  ngOnInit(): void {
    // this.proxy = 'https://cors-anywhere.herokuapp.com/'

    // this.url = `${this.proxy}https://jsonplaceholder.typicode.com/todos/10`;

    // fetch(this.url)
    //   .then(response => response.json())
    //   .then(json => console.log(json))
  }
  showAddModal(){
    const modal = document.getElementById('membersAddModal')
    modal.style.display = "block";
  }

}
