import { DeleteService } from '../shared/delete.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  @ViewChild('selectAllCheckbox') selectAllCheckbox: ElementRef;
  action: string = '';
  stateOpen: boolean = false;
  modalTitle: string;
  dataForModal: any;
  type: string;
  // для участников
  members: any;
  title: string;
  membersID: number[] = [];
  memberID: number[] = [];
  error: string;
  // для структур
  departmentID: string;
  departments: any;
  // для пользователей
  userID: number;

  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private deleteService: DeleteService,
    private API: ApiService
  ) {}

  closeModal() {
    this.deleteService.stateOpen$.next(false);
    this.error = '';
  }

  delete() {
    if (this.type == 'member') {
      this.deleteMember();
    } else if (this.type == 'structure') {
      this.deleteDepartment();
    } else if (this.type == 'subdepartmnet') {
      this.deleteSubDepartment();
    } else if (this.type == 'user') {
      this.deleteUser();
    }
  }

  async deleteDepartment() {
    this.departmentID = this.dataForModal.id;
    await this.API.deleteDepartment(this.departmentID);
  }
  async deleteSubDepartment() {
    await this.API.deleteSubDepartment(this.dataForModal);
  }

  async deleteUser() {
    await this.API.deleteUser(this.userID);
  }

  async deleteMember() {
    this.membersID.length = 0;
    const checkboxes = document.querySelectorAll('.memberCheckbox');
    for (let index = 0; index < checkboxes.length; index++) {
      const element = <HTMLInputElement>checkboxes[index];
      if (element.checked) {
        this.membersID.push(Number(element.value));
      }
    }

    if (this.membersID.length == 0) {
      await this.API.deleteMember(this.memberID);

      this.selectAllCheckbox.nativeElement.checked = false;
      const emptyArray = [];
      this.API.selectedMembersId$.next(emptyArray);
    } else if (this.memberID) {
      const promise = await this.API.deleteMember(this.membersID);

      this.selectAllCheckbox.nativeElement.checked = false;
      this.API.selectedMemberId$.next(undefined);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    
    this.subscription.add(this.deleteService.type$.subscribe((type) => {
      this.type = type;
    }));

    this.subscription.add(this.deleteService.data$.subscribe((data) => {
      console.log(data)
      this.dataForModal = data;
    }));

    this.subscription.add(this.deleteService.modalTitle$.subscribe((title) => {
      this.modalTitle = title;
    }));
    this.subscription.add(this.deleteService.stateOpen$.subscribe((state) => {
      this.stateOpen = state;
    }));

    this.subscription.add(this.API.selectedMemberId$.subscribe((id) => {
      this.memberID.length = 0;
      this.memberID.push(id);
    }));
    this.subscription.add(this.API.titleForDeleteModal$.subscribe((title) => {
      this.title = title;
    }));
    this.subscription.add(this.API.deleteMember$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message;
        this.API.error.next(String(this.error));
      } else {
       
        this.API.responseOK.next('Участник успешно удален');
        this.childEvent.emit();
        this.closeModal();
      }
    }));
    // const membersSub = this.API.members$.subscribe((dataFromApi: any) => {
    //   this.members = dataFromApi.members;
    // });

    this.subscription.add(this.API.departments$.subscribe((departments)=>{
      
      this.departments = departments
    }))

    this.subscription.add(this.API.delStructure$.subscribe(async (data) => {
      if (data.error) {
        this.error = data.error.message;
        this.API.error.next(String(this.error));
      } else {
        this.API.responseOK.next(data.message);
        if(data.message)
        if (this.API.departments.length > 1) {
          if (this.departmentID != this.API.departments[0].id) {
            const firstDepartmentId = this.API.departments[0].id;
            this.router.navigate(['main/structures/' + firstDepartmentId]);
          } else {
            const firstDepartmentId = this.API.departments[1].id;
            this.router.navigate(['main/structures/' + firstDepartmentId]);
          }
        } else {
          this.router.navigate(['main/members']);
        }
        
        this.departments.forEach((department, index) => {
          if(department.id == this.departmentID){
            this.departments.splice(index,1)
          }
        });

        this.API.departments$.next(this.departments)



        this.closeModal();
      }
    }));

    this.subscription.add(this.API.subdepartment$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message;
        this.API.error.next(String(this.error));
      } else {
        this.API.getDepartments();
        if(data.message !== undefined){
          this.API.responseOK.next(data.message);
        }       
        this.closeModal();
      }
    }));

    this.subscription.add(this.API.selectedUserId$.subscribe((id) => {
      this.userID = id;
    }));
    this.subscription.add(this.API.user$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message;
        this.API.error.next(String(this.error));
      } else {
        this.API.responseOK.next('Пользователь успешно удалён');
        this.API.getUsers();
        this.closeModal();
      }
    }))
  }
}
