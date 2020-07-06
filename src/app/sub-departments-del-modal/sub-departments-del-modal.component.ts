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


  closeModal(){
    const modal = document.getElementById('subDepartmentDelModal')
    modal.style.display = "none";
  }
  async deleteSubDepartment(){


    await this.api.deleteSubDepartment(this.subDepartmentId)
    await this.api.getDepartments()
    this.closeModal()

    // Ниже штука, чтобы сразу отобразить изменения
    // this.structureRouting.postData$.next('')
  }
  ngOnInit(): void {
  }

}
