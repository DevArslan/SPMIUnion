import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { Router } from '@angular/router';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-structures-delete-modal',
  templateUrl: './structures-delete-modal.component.html',
  styleUrls: ['./structures-delete-modal.component.scss']
})
export class StructuresDeleteModalComponent implements OnInit {

  @Input() department

  constructor(private router: Router, private api: ApiServiceService) { }
  departmentID: string
  error: string = ''
  private subscription: Subscription = new Subscription();
  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const structureSub = this.api.structure$.subscribe(async(data) => {
      if (data.error) {
        this.error = data.error.message
        this.api.error.next(String(this.error))
      } else {
        this.api.responseOK.next(data.message)
        if(this.api.departments.length > 1){
          if(this.departmentID != this.api.departments[0].id){
            const firstDepartmentId = this.api.departments[0].id
            this.router.navigate(['main/structures/' + firstDepartmentId]);
          }else{
            const firstDepartmentId = this.api.departments[1].id
            this.router.navigate(['main/structures/' + firstDepartmentId]);
          }
        }else{
          this.router.navigate(['main/members']);
        }
        
        this.api.getDepartments()
        this.closeModal()
      }
    })
    this.subscription.add(structureSub)
  }
  closeModal() {
    const modal = document.getElementById('departmentDelModal')
    modal.style.display = "none";
  }
  async deleteDepartment() {

    this.departmentID = this.department.id

    await this.api.deleteDepartment(this.departmentID)



  }

}
