import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { ApiService } from "src/app/shared/api.service";
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Subscription, of } from 'rxjs';
import { ModalService } from "./shared/modal.service";
import { DeleteService } from "../../shared/delete.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(private apiServiceService: ApiService, private modalService: ModalService, private deleteService: DeleteService) { }

  private subscription: Subscription = new Subscription();
  @Input() currentPage: any

  username: string = ''
  membersID: number[] = []
  data: any = []
  dataForModal: {}[] = []
  paginationParams: any

  query: any = ''
  pageNumber: number = 1
  rows: number[] = [10, 20, 30, 40, 50]
  rowsCount: number = 10
  maxPageNumber: number
  membersCount: number = 0
  selectedMembersIdAll: any

  memberID: number

  error: string = 'Сначала выберите участника'


  @ViewChild('inputPage') input: ElementRef;
  @ViewChild('usernameInput') inputUsername: ElementRef;
  @ViewChild('selectAllCheckbox') selectAllCheckbox: ElementRef;

  changeMaxNumberPage() {
    this.maxPageNumber = Math.ceil(this.membersCount / this.rowsCount)
    this.getMembersByPage()
  }

  changePage(event) {
    if (this.pageNumber > 0 && event.target.dataset.pageNumber != 0 && event.target.dataset.pageNumber != this.maxPageNumber + 1) {
      this.pageNumber = event.target.dataset.pageNumber
      this.getMembersByPage()
    }
  }

  getMembersByPage() {
    this.apiServiceService.selectedAllmembers.next(true)
    this.apiServiceService.getMembersByPage(this.rowsCount, this.pageNumber, this.username)
  }

  downloadExcel() {
    this.apiServiceService.downloadExcel()
  }
  async blockMember() {

    if (this.selectedMembersIdAll.length != 0) {
      this.error = ''
      await this.apiServiceService.blockMembers(this.selectedMembersIdAll)
      this.selectAllCheckbox.nativeElement.checked = false
      this.selectedMembersIdAll.length = 0
      this.apiServiceService.selectedMembersIdAll$.next(this.selectedMembersIdAll)
    } else if (this.memberID) {
      this.error = ''
      const memberID = []
      memberID.push(this.memberID)
      await this.apiServiceService.blockMembers(memberID)
      this.selectAllCheckbox.nativeElement.checked = false


    }

  }
  async activateMember() {

    if (this.selectedMembersIdAll.length != 0) {
      this.error = ''
      await this.apiServiceService.activateMembers(this.selectedMembersIdAll)
      this.selectAllCheckbox.nativeElement.checked = false
      this.getMembersByPage()
      this.error = 'Сначала выберите участника'
      this.selectedMembersIdAll.length = 0
      this.apiServiceService.selectedMembersIdAll$.next(this.selectedMembersIdAll)
    } else if (this.memberID) {
      this.error = ''
      const memberID = []
      memberID.push(this.memberID)
      await this.apiServiceService.activateMembers(memberID)
      this.getMembersByPage()
      this.error = 'Сначала выберите участника'
      this.memberID = undefined
    }


  }

  showAddModal() {

    this.modalService.action$.next('add')
    this.modalService.stateOpen$.next(true)
    this.modalService.modalTitle$.next('Добавить участника')

    this.paginationParams = {
      maxPage: this.maxPageNumber,
      rowsCount: this.rowsCount,
      username: this.username
    }

  }
  showEditModal() {

    if (this.memberID && this.membersID.length < 2) {
      this.error = ''

      this.modalService.action$.next('edit')
      this.modalService.stateOpen$.next(true)
      this.modalService.modalTitle$.next('Изменить данные участника')
      this.error = 'Сначала выберите участника'
    }

  }
  showDelModal() {
    if (this.membersID.length != 0) {
      this.error = '';
      this.deleteService.stateOpen$.next(true)
      this.deleteService.type$.next('member')
      this.deleteService.modalTitle$.next('Удалить участника')
      this.deleteService.data$.next(this.selectedMembersIdAll)
      this.error = 'Сначала выберите участника'
      // this.membersID.length = 0
    } else if (this.memberID) {
      this.error = ''
      console.log('delete')
      this.deleteService.stateOpen$.next(true)
      this.deleteService.type$.next('member')
      this.deleteService.modalTitle$.next('Удалить участника')
      this.error = 'Сначала выберите участника'
    }
  }
  check(e) {

    if (Number.isInteger(Number(e.currentTarget.value)) == false || Number(e.currentTarget.value) > this.maxPageNumber) {
      e.currentTarget.value = e.currentTarget.value.slice(0, -1)

    }
    if (e.currentTarget.value === '0') {
      e.currentTarget.value = '1'
    }

  }


  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getMembersByPage()


    this.subscription.add(this.apiServiceService.selectedMembersIdAll$.subscribe((data) => {
      this.selectedMembersIdAll = data
    }))

    this.subscription.add(this.apiServiceService.member$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.apiServiceService.error.next(String(this.error))
      } else {
        this.apiServiceService.responseOK.next(data.message)
        this.getMembersByPage()
        this.error = 'Сначала выберите участника'
        this.membersID.length = 0
        this.memberID = undefined
      }
    }))



    const membersSub = this.apiServiceService.members$.subscribe((dataFromApi: any) => {
      
      if (this.paginationParams != null && this.maxPageNumber != undefined) {
        this.pageNumber = this.maxPageNumber
      }
      this.data = dataFromApi.members

      this.membersCount = dataFromApi.total
      this.maxPageNumber = Math.ceil(Number(this.membersCount) / this.rowsCount)
      this.paginationParams = null

      setTimeout(() => {
        if (this.selectedMembersIdAll != undefined) {
          const checkboxes = document.querySelectorAll('.memberCheckbox')
          for (let index = 0; index < checkboxes.length; index++) {
            const element = <HTMLInputElement>checkboxes[index];
            this.selectedMembersIdAll.forEach(item => {
              if (Number(element.value) == item) {
                element.checked = true
              }
            });
          }
        }
      }, );
    })
    this.subscription.add(membersSub)

    const selectedMemberSub = this.apiServiceService.selectedMemberId$.subscribe((id) => {
      this.memberID = id
      if (this.memberID) {
        this.error = ''
      } else {
        this.error = 'Сначала выберите участников'
      }
    })
    this.subscription.add(selectedMemberSub)
    const selectedMembersSub = this.apiServiceService.selectedMembersId$.subscribe((apiData) => {
      this.membersID = apiData
      if (this.membersID.length != 0) {
        this.error = ''
      } else {
        this.error = 'Сначала выберите участников'
      }

    })
    this.subscription.add(selectedMembersSub)

    const departmentsSub = this.apiServiceService.departments$.subscribe((dataFromApi) => {
      this.modalService.data$.next(dataFromApi)
      this.dataForModal = dataFromApi
    })
    this.subscription.add(departmentsSub)
    this.apiServiceService.getDepartments()
  }
  ngAfterViewInit() {
    // Обращение к серверу происходит после того, как пользователь не печатает на протяжении 1.5 секунд
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap(async (text) => {
          this.pageNumber = Number(<HTMLInputElement>this.input.nativeElement.value)
          const data = await this.getMembersByPage()

        })
      )
      .subscribe();

    fromEvent(this.inputUsername.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(async (text) => {
          this.pageNumber = 1
          const data = await this.getMembersByPage()

        })
      )
      .subscribe();
  }


}
