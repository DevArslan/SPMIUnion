import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { Router } from '@angular/router';
import { ApiServiceService } from "src/app/shared/api-service.service";

@Component({
  selector: 'app-structures-delete-modal',
  templateUrl: './structures-delete-modal.component.html',
  styleUrls: ['./structures-delete-modal.component.scss']
})
export class StructuresDeleteModalComponent implements OnInit {

  @Input() department

  constructor(private router: Router,private api: ApiServiceService) { }
  departmentID:string

  ngOnInit(): void {
  }
  closeModal(){
    const modal = document.getElementById('departmentDelModal')
    modal.style.display = "none";
  }
  async deleteDepartment(){

    this.departmentID = this.department.id
    await this.api.deleteDepartment(this.departmentID)
    await this.api.getDepartments()
    const firstDepartmentId = this.api.departments[0].id
    console.log(firstDepartmentId)
    this.router.navigate(['main/structures/'+firstDepartmentId]);
    this.closeModal()

    // Ниже штука, чтобы сразу отобразить изменения
    // this.structureRouting.postData$.next('')
  }

}
