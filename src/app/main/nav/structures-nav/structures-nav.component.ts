import { Component, OnInit } from '@angular/core';
import { StructuresRoutingService } from 'src/app/shared/structures-routing.service';
import { ApiServiceService } from 'src/app/shared/api-service.service';

@Component({
  selector: 'app-structures-nav',
  templateUrl: './structures-nav.component.html',
  styleUrls: ['./structures-nav.component.scss'],
})
export class StructuresNavComponent implements OnInit {
  faculty: string = '';
  structureName: string = '';
  departmentsTitle: string[] = [];
  /* Достаточно просто тип массив указать с any */
  departmentsData: any[] = [];

  constructor(
    private structureRouting: StructuresRoutingService,
    private apiService: ApiServiceService
  ) {}

  selectStructure(event) {
    this.faculty = event.target.dataset.selectNumber;
    // this.apiService.selectedDepartment = this.departmentsData[0].head_department_id
    // console.log(this.apiService.selectedDepartment)
    this.structureRouting.postData$.next(this.faculty);
  }

  showAddModal() {
    const modal = document.getElementById('structuresAddModal');
    modal.style.display = 'block';
  }

  ngOnInit(): void {
    this.apiService.departments$.subscribe(() => {
      // console.log(this.apiServiceService.departments)
      this.departmentsData = this.apiService.departments;
      this.departmentsData.forEach((element: any) => {
        this.departmentsTitle.push(element.title);
      });
    });
  }
}
