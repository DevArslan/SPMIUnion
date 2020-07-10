import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService) { }

  username: string = ''
  membersID: number[] = []
  data: {}[] = []
  dataForModal: {}[] = []

  pageNumber: number = 1
  rows: number[] = [10, 20, 30, 40, 50]
  rowsCount: number = 10
  maxPageNumber: number
  membersCount: number

  memberID: number

  error: string = 'Сначала выберите участника'

  @ViewChild('inputPage') input: ElementRef;

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

    this.apiServiceService.getMembersByPage(this.rowsCount, this.pageNumber)

  }

  downloadExcel() {
    this.apiServiceService.downloadExcel()
  }
  async blockMember() {

    if (this.membersID.length != 0) {
      this.error = ''
      const promise = await this.apiServiceService.blockMembers(this.membersID)
      if (promise.error) {
        alert(promise.message)
      } else {
        this.getMembersByPage()
        this.error = 'Сначала выберите участника'
        this.membersID.length = 0
      }

    } else if (this.memberID) {
      this.error = ''
      const memberID = []
      memberID.push(this.memberID)
      const promise = await this.apiServiceService.blockMembers(memberID)
      if (promise.error) {
        alert(promise.message)
      } {
        this.getMembersByPage()
        this.error = 'Сначала выберите участника'
        this.membersID.length = 0
      }

    }

  }
  async activateMember() {

    if (this.membersID.length != 0) {
      this.error = ''
      const promise = await this.apiServiceService.activateMembers(this.membersID)
      console.log(promise)
      this.getMembersByPage()
      this.error = 'Сначала выберите участника'
      this.membersID.length = 0
    } else if (this.memberID) {
      this.error = ''
      const memberID = []
      memberID.push(this.memberID)
      const promise = await this.apiServiceService.activateMembers(memberID)
      console.log(promise)
      this.getMembersByPage()
      this.error = 'Сначала выберите участника'
      this.membersID.length = 0
    }

  }

  showAddModal() {
    const modal = document.getElementById('membersAddModal')
    modal.style.display = "block";
  }
  showEditModal() {
    if (this.memberID) {
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


  ngOnInit(): void {
    this.apiServiceService.getMembers()

    this.apiServiceService.members$.subscribe((dataFromApi: any) => {
      this.data = dataFromApi.members
      console.log(this.data)
      this.membersCount = this.data.length

      if (!this.maxPageNumber) {
        this.maxPageNumber = Math.ceil(this.membersCount / this.rowsCount)
      }
    })
    this.apiServiceService.selectedMemberId$.subscribe((id) => {
      this.memberID = id
    })
    this.apiServiceService.selectedMembersId$.subscribe((apiData) => {
      this.membersID = apiData
    })

    this.apiServiceService.getDepartments()
    this.apiServiceService.departments$.subscribe((dataFromApi) => {
      this.dataForModal = dataFromApi
    })

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
  }


}
