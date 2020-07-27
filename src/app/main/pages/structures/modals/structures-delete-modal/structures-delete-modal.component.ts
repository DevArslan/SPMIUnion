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
    const structureSub  = this.api.structure$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.api.error.next(String(this.error))
      } else {
        this.api.getDepartments()
        this.api.departments$.subscribe((data)=>{
          const firstDepartmentId = data[0].id
          this.router.navigate(['main/structures/' + firstDepartmentId]);
        })
        this.api.responseOK.next(data.message)
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
