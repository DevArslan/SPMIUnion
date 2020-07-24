import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { promise } from 'protractor';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService) { }

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

      this.apiServiceService.member$.subscribe((data) => {
        if (data.error) {
          this.error = data.error.message
          this.apiServiceService.error.next(String(this.error))
        } else {
          this.apiServiceService.responseOK.next('Участники успешно заблокированы')
          this.getMembersByPage()
          this.error = 'Сначала выберите участника'
          this.membersID.length = 0
        }
      })

    } else if (this.memberID) {
      this.error = ''
      const memberID = []
      memberID.push(this.memberID)
      await this.apiServiceService.blockMembers(memberID)
      const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
      selectAllCheckbox.checked = false
      this.apiServiceService.member$.subscribe((data) => {
        if (data.error) {
          this.error = data.error.message
          this.apiServiceService.error.next(String(this.error))
        } else {
          this.apiServiceService.responseOK.next('Участник успешно заблокирован')
          this.error = 'Сначала выберите участника'
          this.memberID = undefined
        }
      })

    }

  }
  async activateMember() {

    if (this.membersID.length != 0) {
      this.error = ''
      await this.apiServiceService.activateMembers(this.membersID)
      this.apiServiceService.member$.subscribe((data) => {
        if (data.error) {
          this.error = data.error.message
          this.apiServiceService.error.next(String(this.error))
        } else {
          this.apiServiceService.responseOK.next('Участники успешно активированы')
        }
      })
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
      this.apiServiceService.member$.subscribe((data) => {
        if (data.error) {
          this.error = data.error.message
          this.apiServiceService.error.next(String(this.error))
        } else {
          this.apiServiceService.responseOK.next('Участник успешно активирован')
        }
      })
      this.getMembersByPage()
      this.error = 'Сначала выберите участника'
      this.memberID = undefined
    }
    

  }

  showAddModal() {
    const modal = document.getElementById('membersAddModal')
    modal.style.display = "block";
  }
  showEditModal() {
    console.log(this.membersID.length)
    if (this.memberID && this.membersID.length < 2) {
      this.error = ''
      const modal = document.getElementById('membersEditModal')
      modal.style.display = "block";
      this.error = 'Сначала выберите участника'
    }

  }
  showDelModal() {
    if (this.membersID.length != 0) {
      this.error = ''
      const modal = document.getElementById('membersDelModal')
      modal.style.display = "block";
      this.error = 'Сначала выберите участника'
      this.membersID.length = 0
    } else if (this.memberID) {
      this.error = ''
      const modal = document.getElementById('membersDelModal')
      modal.style.display = "block";
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

  ngOnInit(): void {
    this.getMembersByPage()



    this.apiServiceService.members$.subscribe((dataFromApi: any) => {
      this.data = dataFromApi.members
      this.membersCount = dataFromApi.total
      if (!this.maxPageNumber) {

        this.maxPageNumber = Math.ceil(Number(this.membersCount) / this.rowsCount)

      }

    })

    this.apiServiceService.selectedMemberId$.subscribe((id) => {
      this.memberID = id
      if (this.memberID) {
        this.error = ''
      } else {
        this.error = 'Сначала выберите участников'
      }
    })
    this.apiServiceService.selectedMembersId$.subscribe((apiData) => {
      this.membersID = apiData
      if (this.membersID.length != 0) {
        this.error = ''
      } else {
        this.error = 'Сначала выберите участников'
      }

    })

    this.apiServiceService.departments$.subscribe((dataFromApi) => {
      this.dataForModal = dataFromApi
    })
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
