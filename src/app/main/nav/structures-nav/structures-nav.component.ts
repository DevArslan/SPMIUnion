import { Component, OnInit } from '@angular/core';
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
  departmentsData: any;

  constructor(
    private apiService: ApiServiceService
  ) {}


  showAddModal() {
    const modal = document.getElementById('structuresAddModal');
    modal.style.display = 'block';
  }

  ngOnInit(): void {
    this.apiService.departments$.subscribe((data) => {
      this.departmentsData = data;
      this.departmentsData.forEach((element: any) => {
        this.departmentsTitle.push(element.title);
      });
    });
  }
}
