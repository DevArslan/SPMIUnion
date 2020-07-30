import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Subscription, of } from 'rxjs';
import { promise } from 'protractor';
import { ModalService } from "./shared/modal.service";
import { DeleteService } from "../../shared/delete.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService, private modalService: ModalService, private deleteService : DeleteService) { }

  private subscription: Subscription = new Subscription();

  username: string = ''
  membersID: number[] = []
  data: any = []
  dataForModal: {}[] = []

  query: any = ''
  pageNumber: number = 1
  rows: number[] = [10, 20, 30, 40, 50]
  rowsCount: number = 10
  maxPageNumber: number
  membersCount: number = 0

  memberID: number

  error: string = 'Сначала выберите участника'


  @ViewChild('inputPage') input: ElementRef;
  @ViewChild('usernameInput') inputUsername: ElementRef;

  changeMaxNumberPage() {
    this.maxPageNumber = Math.ceil(this.membersCount / this.rowsCount)
    this.getMembersByPage()
  }

  changePage(event) {
    if (this.pageNumber > 0 && event.target.dataset.pageNumber != 0 && event.target.dataset.pageNumber != this.maxPageNumber + 1) {
      this.pageNumber = event.target.dataset.pageNumber
      console.log(event.target.dataset.pageNumber)
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

    if (this.membersID.length != 0) {
      this.error = ''
      await this.apiServiceService.blockMembers(this.membersID)
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false



    } else if (this.memberID) {
      this.error = ''
      const memberID = []
      memberID.push(this.memberID)
      await this.apiServiceService.blockMembers(memberID)
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false


    }

  }
  async activateMember() {

    if (this.membersID.length != 0) {
      this.error = ''
      await this.apiServiceService.activateMembers(this.membersID)

      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      this.getMembersByPage()
      this.error = 'Сначала выберите участника'
      this.membersID.length = 0
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
    // const modal = document.getElementById('membersAddModal')
    // modal.style.display = "block";
  }
  showEditModal() {
    console.log(this.membersID.length)
    if (this.memberID && this.membersID.length < 2) {
      this.error = ''
      // const modal = document.getElementById('membersEditModal')
      // modal.style.display = "block";
      this.modalService.action$.next('edit')
      this.modalService.stateOpen$.next(true)
      this.modalService.modalTitle$.next('Изменить данные участника')
      this.error = 'Сначала выберите участника'
    }

  }
  showDelModal() {
    if (this.membersID.length != 0) {
      this.error = ''
      // const modal = document.getElementById('membersDelModal')
      // modal.style.display = "block";
      this.deleteService.stateOpen$.next(true)
      this.deleteService.modalTitle$.next('Удалить участника')
      this.error = 'Сначала выберите участника'
      this.membersID.length = 0
    } else if (this.memberID) {
      this.error = ''
      // const modal = document.getElementById('membersDelModal')
      // modal.style.display = "block";
      this.deleteService.stateOpen$.next(true)
      this.deleteService.modalTitle$.next('Удалить участника')
      this.error = 'Сначала выберите участника'
    }
  }
  check(e) {
    console.log(e.currentTarget.value)
    if (Number.isInteger(Number(e.currentTarget.value)) == false || Number(e.currentTarget.value) > this.maxPageNumber) {
      e.currentTarget.value = e.currentTarget.value.slice(0, -1)
      console.log(e.currentTarget.value)
    }
    if (e.currentTarget.value === '0') {
      e.currentTarget.value = '1'
    }

  }


  ngOnDestroy(): void {
    console.log(this.subscription)
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getMembersByPage()


    this.apiServiceService.member$.subscribe((data) => {
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
    })



    const membersSub = this.apiServiceService.members$.subscribe((dataFromApi: any) => {
      this.data = dataFromApi.members
      
      this.membersCount = dataFromApi.total
      if (!this.maxPageNumber) {

        this.maxPageNumber = Math.ceil(Number(this.membersCount) / this.rowsCount)

      }

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

    this.getMembersByPage()
  }
  ngAfterViewInit() {
    // Обращение к серверу происходит после того, как пользователь не печатает на протяжении 1.5 секунд
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap(async (text) => {
          // console.log(this.input.nativeElement.value)
          this.pageNumber = Number(<HTMLInputElement>this.input.nativeElement.value)
          const data = await this.getMembersByPage()
          console.log(data)
        })
      )
      .subscribe();

    fromEvent(this.inputUsername.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(async (text) => {
          // console.log(this.input.nativeElement.value)
          const data = await this.getMembersByPage()

        })
      )
      .subscribe();
  }


}
