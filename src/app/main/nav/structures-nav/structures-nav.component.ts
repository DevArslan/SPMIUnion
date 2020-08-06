import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Subscription, of } from 'rxjs';
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
    private apiService: ApiService
  ) {}

  private subscription: Subscription = new Subscription();


  showAddModal() {
    const modal = document.getElementById('structuresAddModal');
    modal.style.display = 'block';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(this.apiService.departments$.subscribe((data) => {
      this.departmentsData = data;
      this.departmentsData.forEach((element: any) => {
        this.departmentsTitle.push(element.title);
      });
    }));
  }
}
