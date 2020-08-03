import { DeleteService } from "../shared/delete.service";
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from "src/app/shared/api.service";
import { Input } from "@angular/core";
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Output() childEvent = new EventEmitter();

  action: string = '';
  stateOpen: boolean = false;
  modalTitle: string;
  dataForModal: any;
  type: string
  // для участников
  title: string
  membersID: number[] = []
  memberID: number[] = []
  error: string
  // для структур
  departmentID: string
  // для пользователей
  userID: number

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private deleteService: DeleteService, private API: ApiService) { }

  closeModal() {
    this.deleteService.stateOpen$.next(false)
    this.error = ''
  }


  delete() {
    if (this.type == 'member') {
      this.deleteMember()
    } else if (this.type == 'structure') {
      this.deleteDepartment()
    } else if (this.type == 'subdepartmnet') {
      this.deleteSubDepartment()
    } else if (this.type == 'user'){
      this.deleteUser()
    }
  }

  async deleteDepartment() {

    this.departmentID = this.dataForModal.id
    await this.API.deleteDepartment(this.departmentID)

  }
  async deleteSubDepartment() {

    await this.API.deleteSubDepartment(this.dataForModal)

  }

  async deleteUser() {

    await this.API.deleteUser(this.userID);

  }

  async deleteMember() {
    this.membersID.length = 0
    const checkboxes = document.querySelectorAll('.memberCheckbox')
    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      if (element.checked) {
        this.membersID.push(Number(element.value))
      }
    }

    if (this.membersID.length == 0) {
      await this.API.deleteMember(this.memberID)
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      const emptyArray = []
      this.API.selectedMembersId$.next(emptyArray)

    } else if (this.memberID) {
      const promise = await this.API.deleteMember(this.membersID)
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      this.API.selectedMemberId$.next(undefined)

    }

  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  ngOnInit(): void {


    this.deleteService.type$.subscribe((type) => {
      this.type = type
    })

    this.deleteService.data$.subscribe((data) => {
      this.dataForModal = data
    })

    this.deleteService.modalTitle$.subscribe((title) => {
      this.modalTitle = title;
    })
    this.deleteService.stateOpen$.subscribe((state) => {
      console.log(state)
      this.stateOpen = state;
    })

    this.API.selectedMemberId$.subscribe((id) => {
      this.memberID.length = 0
      this.memberID.push(id)
      console.log(this.memberID)
    })
    this.API.titleForDeleteModal$.subscribe((title) => {
      this.title = title
    })
    this.API.deleteMember$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.API.error.next(String(this.error))
      } else {
        this.API.responseOK.next('Участник успешно удален')
        this.childEvent.emit();
        this.closeModal()
      }
    })

    const structureSub = this.API.structure$.subscribe(async (data) => {
      if (data.error) {
        this.error = data.error.message
        this.API.error.next(String(this.error))
      } else {
        this.API.responseOK.next(data.message)
        if (this.API.departments.length > 1) {
          if (this.departmentID != this.API.departments[0].id) {
            const firstDepartmentId = this.API.departments[0].id
            this.router.navigate(['main/structures/' + firstDepartmentId]);
          } else {
            const firstDepartmentId = this.API.departments[1].id
            this.router.navigate(['main/structures/' + firstDepartmentId]);
          }
        } else {
          this.router.navigate(['main/members']);
        }

        this.API.getDepartments()
        this.closeModal()
      }
    })
    this.subscription.add(structureSub)

    this.API.subdepartment$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.API.error.next(String(this.error))
      } else {
        this.API.getDepartments()
        this.API.responseOK.next('Подразделение успешно удалено')
        this.closeModal()
      }
    })

    this.API.selectedUserId$.subscribe((id) => {
      this.userID = id;
    });
    this.API.user$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.API.error.next(String(this.error))
      } else {
        this.API.responseOK.next('Пользователь успешно удалён')
        this.API.getUsers()
        this.closeModal()
      }
    })

  }

}
