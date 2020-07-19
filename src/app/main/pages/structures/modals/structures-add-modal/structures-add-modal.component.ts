import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
@Component({
  selector: 'app-structures-add-modal',
  templateUrl: './structures-add-modal.component.html',
  styleUrls: ['./structures-add-modal.component.scss']
})
export class StructuresAddModalComponent implements OnInit {

  title: string;
  proforg: string;

  error = ''
  constructor(private api: ApiServiceService) { }

  ngOnInit(): void {
  }
  closeModal(){
    const modal = document.getElementById('structuresAddModal')
    modal.style.display = "none";
    this.title = ''
    this.proforg = ''
  }
  async createDepartment(){
    const promise = await this.api.createDepartment(this.title, this.proforg)
    if(promise.error){
      this.error = promise.message
      this.api.error.next(String(this.error))
    }else{
      await this.api.getDepartments()
      this.api.responseOK.next('Структура успешно создана')
      this.closeModal()
    }
    
  }
}
