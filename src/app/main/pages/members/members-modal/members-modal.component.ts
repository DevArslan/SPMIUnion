import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Input } from '@angular/core';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { ModalService } from '../shared/modal.service';
import { ApiService } from '../../../../shared/api.service';

@Component({
  selector: 'app-members-modal',
  templateUrl: './members-modal.component.html',
  styleUrls: ['./members-modal.component.scss'],
})
export class MembersModalComponent implements OnInit, OnDestroy {
 
  @ViewChild('inputName') input: ElementRef;
  @ViewChild('cardNumberInput') cardNumberInput: ElementRef;
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('modalBack') modalBack: ElementRef;

  subscription: Subscription = new Subscription();
  waitingForMembersServerResponse: Boolean = null;
  waitingForServerResponse: Boolean = null;

  // Приходит с сервиса modalService
  action: string = '';
  stateOpen: boolean = false;
  modalTitle: string;
  dataForModal: {}[] = [];

  data: any[] = [];
  memberID: number;
  membersDropdown: boolean = false;
  structureDropdown: boolean = false;
  facultyDropdown: boolean = false;
  faculty: string = 'Факультет';
  structure: string = 'Подразделение';
  structures: string[] = ['Сначала выберите факультет'];
  members: any = [];
  preloader: boolean = false;
  error: string = '';
  name: string = '';
  card: string;
  cardNumber: string;
  subdepartmentID: number;
  isStudent: boolean;

  editData: { name: string, card: string, structure: string, student: boolean } = { name: '', card: '', structure: '', student: false }
  constructor(private modalService: ModalService, private API: ApiService) { }

  /* NOTE: 
    Если ты отдельно создаешь метод createMember и Subject createMember$, то и используй этот функционал.
    Логика по результатам запроса должна не здесь находиться, а в подписке на Subject.
    async здесь, соответственно, не нужен.
    TODO: Сделай то же самое для остальной логики.

    Я вообще в таких случаях обычно в сервисе возвращаю подписку и подписываюсь в компоненте.
    И в зависимости от результата какие-то действия делаю.
    Но так тоже сойдет. Правда API сервис сейчас слишком большой, его по-хорошему нужно разбивать
    на отдельные сервисы.
  */
  createMember() {
    this.API.createMember(
      this.name,
      this.card,
      this.subdepartmentID,
      this.isStudent
    );
    this.waitingForServerResponse = true;
  }

  // #NOTE: Зачем здесь async был?
  editMember() {
    this.API.editMember(
      this.name,
      this.card,
      this.subdepartmentID,
      this.isStudent,
      this.memberID
    );
    this.waitingForServerResponse = true;
  }

  selectMember(event) {
    this.name = event.currentTarget.dataset.selectName;
    event.target.placeholder = this.name;

    this.card = event.currentTarget.dataset.selectCard;
    this.cardNumber =
      'номер карты: ' +
      String(event.currentTarget.dataset.selectCardNumber).toUpperCase();
    // TODO: Все что document.getElementById переделать в ViewChild
    this.cardNumberInput.nativeElement.placeholder = this.card;

    this.dropDownMembers();
    event.stopPropagation();
  }

  searchInAKSP(name) {
    if (this.action == 'add') {
      this.API.getMembersAKPS(name);
      this.waitingForMembersServerResponse = true;
    }
  }

  selectFaculty(event) {
    this.structures.length = 0;
    this.faculty = event.target.dataset.selectFaculty;
    this.dropDownFaculty();
    this.dataForModal.forEach((element: any) => {
      if (this.faculty == element.title) {
        element.sub_departments.forEach((item) => {
          this.structures.push(item);
        });
      }
    });
  }

  selectStructure(event) {
    this.structure = event.target.dataset.selectStructure;
    this.subdepartmentID = event.target.dataset.selectId;
    this.dropDownStructure();
  }

  dropDownFaculty() {
    this.facultyDropdown = !this.facultyDropdown;
    this.structureDropdown = false;
    this.membersDropdown = false;
  }
  dropDownStructure() {
    this.structureDropdown = !this.structureDropdown;
    this.facultyDropdown = false;
    this.membersDropdown = false;
  }
  dropDownMembers() {
    this.membersDropdown = !this.membersDropdown;
    this.structureDropdown = false;
    this.facultyDropdown = false;
  }

  closeAllDropdownWrapper(event) {
    if (event.target == this.modal.nativeElement) {
      this.structureDropdown = false;
      this.facultyDropdown = false;
      this.membersDropdown = false;
    }
  }
  closeAllDropdown(event) {
    if (event.target == this.modalBack.nativeElement) {
      this.structureDropdown = false;
      this.facultyDropdown = false;
      this.membersDropdown = false;
    }
  }

  closeModal() {
    this.modalService.stateOpen$.next(false);
    if (this.action == 'add') {
      this.name = this.editData.name;
      this.card = this.editData.card;
      this.structure = this.editData.structure;
      this.isStudent = this.editData.student;
    }
  }
  resetParams() {
    this.faculty = 'Факультет';
    this.structure = 'Подразделение';
    this.name = '';
    this.card = '';
    this.isStudent = false;
    this.error = '';
    this.subdepartmentID = null;
    this.structures.length = 0;
    this.cardNumber = '';
  }

  ngOnInit(): void {
    this.subscription.add(
      this.modalService.action$.subscribe((action) => {
        if (action == 'add') {
          this.resetParams()
        }
        this.action = action;
      })
    );
    this.subscription.add(
      this.modalService.stateOpen$.subscribe((state) => {
        this.stateOpen = state;
      })
    );
    this.subscription.add(
      this.modalService.modalTitle$.subscribe((title) => {
        this.modalTitle = title;
      })
    );
    this.subscription.add(
      this.modalService.data$.subscribe((data) => {
        this.dataForModal = data;
      })
    );
    this.subscription.add(
      this.API.members$.subscribe((dataFromApi: any) => {
        this.data = dataFromApi.members;
      })
    );
    this.subscription.add(
      this.API.createMember$.subscribe((data) => {
        this.waitingForServerResponse = false;
        if (data.error) {
          this.error = data.error.message;
          if (
            this.error.slice(0, 50) ==
            'Ошибка обновления базы системы социального питания'
          ) {
            this.API.error.next(
              'Участник с таким именем уже есть в системе социального питания'
            );
          } else {
            this.API.error.next(String(this.error));
          }
        } else {
          this.API.responseOK.next('Участник успешно добавлен');
          this.data.push(data.member);
          const membersData = {
            members: this.data,
            total: this.data.length,
          };
          this.API.members$.next(membersData);
          this.resetParams()
          this.closeModal();
        }
        const selectAllCheckbox = <HTMLInputElement>(
          document.getElementById('selectAllCheckbox')
        );
        selectAllCheckbox.checked = false;
      })
    );

    // NOTE: Не совсем понимаю почему именно так ошибку обрабатываешь здесь (и в других подписках тоже)
    // Почему не используешь колбэк для ошибки в подписке?
    this.subscription.add(
      this.API.membersAKPS$.subscribe((dataFromAPI: any) => {
        this.waitingForMembersServerResponse = false;
        if (dataFromAPI.error) {
          // this.error = dataFromAPI.message;
          this.error = 'Пользователи не найдены';
          this.API.error.next(String(this.error));
        } else {
          this.members = dataFromAPI;
        }
        this.membersDropdown = true;
      })
    );

    // NOTE: Почему preloader именно в API сервисе? По-моему лучше в отдельный сервис вынести
    // И почему он в принципе в сервисе? Разве нельзя в компоненте логику реализовать?
    this.subscription.add(
      this.API.preloader$.subscribe((dataFromAPI) => {
        this.preloader = dataFromAPI;
      })
    );

    this.subscription.add(
      this.API.editMember$.subscribe((data) => {
        this.waitingForServerResponse = false;
        if (data.error) {
          this.error = data.error.message;
          this.API.error.next(String(this.error));
        } else {
          //console.log(this.data);
          //console.log(data);

          const newData = this.data.map((o) => {
            if (o.id === data.member.id) {
              return data.member;
            }
            return o;
          });
          const membersData = {
            members: newData,
            total: this.data.length,
          };

          this.API.members$.next(membersData);
          this.API.responseOK.next('Участник успешно изменен');
        
          this.API.selectedMemberId$.next(undefined);
          this.closeModal();
        }
      })
    );

    this.subscription.add(
      this.API.selectedMemberId$.subscribe((id) => {
        this.waitingForServerResponse = false;
        this.structures.length = 0;
        this.memberID = id;
        this.data.forEach((element: any) => {
          if (element.id == this.memberID) {
            this.name = element.name;
            this.card = element.card;
            this.structure = element.subdepartment;
            this.isStudent = element.is_student;
            this.editData = { name: this.name, card: this.card, structure: this.structure, student: this.isStudent }
          }
        });

        this.API.departments.forEach((department: any) => {
          department.sub_departments.forEach((subdepartment: any) => {
            if (subdepartment.title == this.structure) {
              this.faculty = department.title;
            }
          });
        });
        this.dataForModal.forEach((element: any) => {
          if (this.faculty == element.title) {
            element.sub_departments.forEach((item) => {
              this.structures.push(item);
            });
          }
        });
      })
    );
  }

  ngAfterViewInit() {
    // Обращение к серверу происходит после того, как пользователь не печатает на протяжении 1.5 секунд
    // NOTE: 1.5 сек как-то много, пусть будет 800 мс
    // Вообще мне очень не нравится этот код, нужно его переработать
    // Зачем таймайт на 4 секунды?
    // NOTE:
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(800),
        distinctUntilChanged(),
        tap((text) => {
          const memberName = <HTMLInputElement>this.input.nativeElement.value;
          // NOTE: Вот это здесь зачем например? и async тогда не нужен.
          if (String(memberName) != '') {
            this.searchInAKSP(memberName);
          } else {
            this.membersDropdown = false;
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    // #NOTE: Отписываемся от всех событий при Destroy компонента
    this.subscription.unsubscribe();
    // Быстрый фикс бага
    this.preloader = null;
  }
}
