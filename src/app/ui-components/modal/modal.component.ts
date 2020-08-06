import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalService } from "./modal.service";
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ChangeDetectorRef } from "@angular/core";
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})


export class ModalComponent implements OnInit {
  title: string
  action: string

  // userCreate
  @Input() roles: [] = [];
  roleDropdown: boolean = false;
  roleLabel: string = 'Выберите роль';
  username: string;
  password: string;
  login: string;
  error = '';
  // userEdit
  roleID: number;
  userID: number;
  users: any;
  //userDelete

  //memberCreate
  @Output() childEvent = new EventEmitter();
  @Input() dataForModal: {}[] = []

  membersDropdown: boolean = false
  structureDropdown: boolean = false
  facultyDropdown: boolean = false
  faculty: string = 'Факультет'
  structure: string = 'Подразделение'
  structures: string[] = ['Сначала выберите факультет']
  members: any = []
  preloader: boolean = false

  name: string = ''
  card: string
  cardNumber: string
  subdepartmentID: number
  isStudent: boolean

  @ViewChild('inputName', { static: false }) input: ElementRef;

  constructor(public modalService: ModalService, private api: ApiServiceService, private changeDetector : ChangeDetectorRef) { }



  async createUser() {
    await this.api.createUser(
      this.username,
      this.login,
      this.password
    );
  }
  async editUser() {
    await this.api.editUser(this.userID, this.roleID);
  }
  async deleteMember() {
    await this.api.deleteUser(this.userID);
  }

  closeAllDropdownWrapper(event) {
    if (event.target == document.getElementById('modal')) {
      this.structureDropdown = false
      this.facultyDropdown = false
      this.membersDropdown = false
    }
  }
  closeAllDropdown(event) {
    console.log(event.target)
    console.log(document.getElementById('modalBack'))
    if (event.target == document.getElementById('modalBack')) {
      this.structureDropdown = false
      this.facultyDropdown = false
      this.membersDropdown = false
    }
  }

  searchInAKSP(name) {
    this.api.getMembersAKPS(name)
  }


  async createMember() {
    let index = 1
    await this.api.createMember(this.name, this.card, this.subdepartmentID, this.isStudent)
    const selectAllCheckbox = <HTMLInputElement>document.getElementById('selectAllCheckbox')
    selectAllCheckbox.checked = false
  }

  selectFaculty(event) {
    this.structures.length = 0
    this.faculty = event.target.dataset.selectFaculty
    this.dropDownFaculty()
    this.dataForModal.forEach((element: any) => {
      if (this.faculty == element.title) {
        element.sub_departments.forEach(item => {
          this.structures.push(item)
        });
      }
    })
  }

  selectMember(event) {
    console.log(event)

    this.name = event.currentTarget.dataset.selectName
    event.target.placeholder = this.name

    this.card = event.currentTarget.dataset.selectCard
    this.cardNumber = 'номер карты: ' + String(event.currentTarget.dataset.selectCardNumber).toUpperCase()
    const cardInputElement = <HTMLInputElement>document.getElementById('cardNumber')
    cardInputElement.placeholder = this.card

    this.dropDownMembers()
    event.stopPropagation()
  }

  selectStructure(event) {
    this.structure = event.target.dataset.selectStructure
    this.subdepartmentID = event.target.dataset.selectId
    this.dropDownStructure()
  }



  dropDownFaculty() {
    this.facultyDropdown = !this.facultyDropdown
    this.structureDropdown = false
    this.membersDropdown = false
  }
  dropDownStructure() {
    this.structureDropdown = !this.structureDropdown
    this.facultyDropdown = false
    this.membersDropdown = false

  }
  dropDownMembers() {
    this.membersDropdown = !this.membersDropdown
    this.structureDropdown = false
    this.facultyDropdown = false

  }

  closeModal() {
    console.log('close')
    const modal = document.getElementById('modalID');
    console.log(modal)
    modal.style.display = 'none';
    this.username = undefined;
    this.password = undefined;
    this.login = undefined;
    this.roleLabel = 'Выберите роль';
    this.modalService.modalParams.next({ title: '', action: '' })
    this.faculty = 'Факультет'
    this.structure = 'Подразделение'
    this.name = '';
    this.card = '';
    this.isStudent = false
    this.error = ''
    this.subdepartmentID = null
    this.structures.length = 0
    this.cardNumber = ''
  }

  selectRole(event) {
    if (this.action == 'createUser') {
      this.roleLabel = event.target.dataset.selectRole;
      this.dropDownRole();
    } else if (this.action == 'editUser') {
      this.roleLabel = event.target.dataset.selectRole;
      this.roleID = event.target.dataset.roleId;
      this.dropDownRole();
    }

  }


  dropDownRole() {
    this.roleDropdown = !this.roleDropdown;
  }


  ngOnInit(): void {
    // Проверяем, какое моадльное окно нужно открыть
    this.changeDetector.detectChanges();
    this.modalService.modalParams.subscribe((params) => {
      
      console.log(params)
      if (params.title != '') {
        
        const modal = document.getElementById('modalID');
        console.log(modal)
        modal.style.display = 'block';
        
      }
      
      this.title = params.title
      this.action = params.action
      
    })


    this.api.member$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.api.error.next(String(this.error))
      } else {
        this.api.responseOK.next('Участник успешно добавлен')
        this.childEvent.emit();
        this.closeModal()
      }
    })

    this.api.membersAKPS$.subscribe((dataFromAPI: any) => {
      if (dataFromAPI.error) {
        this.error = dataFromAPI.message
        this.api.error.next(String(this.error))
      } else {
        this.members = dataFromAPI
      }
      this.membersDropdown = true
    })
    this.api.preloader$.subscribe((dataFromAPI) => {
      this.preloader = dataFromAPI
    })

    

    this.api.selectedUserId$.subscribe((id) => {
      this.userID = id;
    });



    this.api.user$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.api.error.next(String(this.error))
      } else {
        this.api.responseOK.next('Пользователь успешно удалён')
        this.api.getUsers()
        this.closeModal()
      }
    })



    this.api.user$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.api.error.next(String(this.error))
      } else {
        this.api.responseOK.next('Пользователь успешно создан')
        this.api.getUsers()
        this.closeModal()
      }
    })
    this.api.user$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
        this.api.error.next(String(this.error))
      } else {
        this.api.responseOK.next('Пользователь успешно изменен')
        this.api.getUsers()
        this.closeModal()
        this.roleLabel = 'Роль';
      }
    })



    this.api.users$.subscribe((dataFromApi: any) => {
      this.users = dataFromApi.users;
      this.api.selectedUserId$.subscribe((data) => {
        this.userID = data;
        if (this.userID) {
          this.error = '';
        } else {
          this.error = 'Сначала выберите участников';
        }
        this.users.forEach((user): any => {
          if (user.id == this.userID) {
            this.roleLabel = user.role;
          }
        });
      });
    });
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
          const memberName = <HTMLInputElement>this.input.nativeElement.value
          const preloader = document.getElementById('preloader')
          if (String(memberName) != '') {
            const data = await this.searchInAKSP(memberName)
          } else {
            this.membersDropdown = false
          }

        })
      )
      .subscribe();
  }


}
