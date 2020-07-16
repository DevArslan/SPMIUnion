import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ApiServiceService } from "src/app/shared/api-service.service";
@Component({
  selector: 'app-sub-departments-del-modal',
  templateUrl: './sub-departments-del-modal.component.html',
  styleUrls: ['./sub-departments-del-modal.component.scss']
})
export class SubDepartmentsDelModalComponent implements OnInit {
  @Input() subDepartmentId
  constructor(private api: ApiServiceService) { }
  error: string = ''

  closeModal(){
    const modal = document.getElementById('subDepartmentDelModal')
    modal.style.display = "none";
  }
  async deleteSubDepartment(){

    const promise = await this.api.deleteSubDepartment(this.subDepartmentId)
    if(promise.error){
      this.error = promise.message
      this.api.error.next(String(this.error))
      
    }else{
      await this.api.getDepartments()
      this.api.responseOK.next('Поздразделение успешно удалено')
      this.closeModal()
    }
    

    // Ниже штука, чтобы сразу отобразить изменения
    // this.structureRouting.postData$.next('')
  }
  ngOnInit(): void {
  }

}
