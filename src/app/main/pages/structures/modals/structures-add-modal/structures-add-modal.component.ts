import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from "src/app/shared/api.service";
import { Subscription, of } from 'rxjs';
@Component({
  selector: 'app-structures-add-modal',
  templateUrl: './structures-add-modal.component.html',
  styleUrls: ['./structures-add-modal.component.scss']
})
export class StructuresAddModalComponent implements OnInit {

  title: string;
  proforg: string;

  departments: any
  error = ''
  constructor(private api: ApiService) { }
  private subscription: Subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription.add (this.api.departments$.subscribe((departments)=>{
      this.departments = departments
    }))

    this.subscription.add(this.api.addStructure$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.api.error.next(String(this.error))
      } else {

        this.departments.push(data)
        this.api.departments$.next(this.departments)
  
        this.closeModal()
      }
    }))

  }
  closeModal() {

    const modal = document.getElementById('structuresAddModal')
    modal.style.display = "none";
    this.title = ''
    this.proforg = ''
  }
  async createDepartment() {
    await this.api.createDepartment(this.title, this.proforg)
  }
}
