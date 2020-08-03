import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Input } from '@angular/core';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ModalService } from '../shared/modal.service';
import { ApiService } from '../../../../shared/api.service';

@Component({
  selector: 'app-members-modal',
  templateUrl: './members-modal.component.html',
  styleUrls: ['./members-modal.component.scss'],
})
export class MembersModalComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  @ViewChild('inputName') input: ElementRef;

  // Приходит с сервиса modalService
  action: string = '';
  stateOpen: boolean = false;
  modalTitle: string;
  dataForModal: {}[] = [];

  data: {}[] = [];
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

  constructor(
    private modalService: ModalService,
    private API: ApiService
  ) { }

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
  }

  async editMember() {
    await this.API.editMember(
      this.name,
      this.card,
      this.subdepartmentID,
      this.isStudent,
      this.memberID
    );
  }

  selectMember(event) {
    console.log(event);

    this.name = event.currentTarget.dataset.selectName;
    event.target.placeholder = this.name;

    this.card = event.currentTarget.dataset.selectCard;
    this.cardNumber =
      'номер карты: ' +
      String(event.currentTarget.dataset.selectCardNumber).toUpperCase();
    // TODO: Все что document.getElementById переделать в ViewChild
    const cardInputElement = <HTMLInputElement>(
      document.getElementById('cardNumber')
    );
    cardInputElement.placeholder = this.card;

    this.dropDownMembers();
    event.stopPropagation();
  }

  // NOTE: Что это за фукнция?)
  searchInAKSP(name) {
    this.API.getMembersAKPS(name);
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
    if (event.target == document.getElementById('modal')) {
      this.structureDropdown = false;
      this.facultyDropdown = false;
      this.membersDropdown = false;
    }
  }
  closeAllDropdown(event) {
    console.log(event.target);
    console.log(document.getElementById('modalBack'));
    if (event.target == document.getElementById('modalBack')) {
      this.structureDropdown = false;
      this.facultyDropdown = false;
      this.membersDropdown = false;
    }
  }

  closeModal() {
    this.modalService.stateOpen$.next(false);
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
    this.modalService.action$.subscribe((action) => {
      this.action = action;
    });
    this.modalService.stateOpen$.subscribe((state) => {
      this.stateOpen = state;
    });
    this.modalService.modalTitle$.subscribe((title) => {
      this.modalTitle = title;
    });
    this.modalService.data$.subscribe((data) => {
      this.dataForModal = data;
    });
    const membersSub = this.API.members$.subscribe((dataFromApi: any) => {
      this.data = dataFromApi.members;
    });
    this.API.createMember$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message;
        if (this.error.slice(0, 50) == 'Ошибка обновления базы системы социального питания') {
          this.API.error.next('Участник с таким именем уже есть в системе социального питания');
        } else {
          this.API.error.next(String(this.error));
        }

      } else {
        this.API.responseOK.next('Участник успешно добавлен');
        /* NOTE:
        Вместо того, чтобы после добавления или изменения эмитить действие родительскому компоненту, нужно 
        изменять массив members (полученный по подписке) и передать в members$ этот новый массив. 
        Поскольку в родительском компоненте есть подписка на этот сабжект, то в нем данные обновятся.

        Сейчас лишнее действие происходит и концептуально получается, что ты смешал два подхода вместе.

        TODO: Замени this.childEvent.emit() на добавление участника в массив members. А потом передай этот
        массив в members$. Убери лишнюю логику в род компоненте тоже.
        */
        this.childEvent.emit();
        this.closeModal();
      }
      // NOTE: Теперь эта логика здесь. Но вообще говоря, я не понял зачем это здесь нужно?
      // TODO: Убери если это бесполезно
      const selectAllCheckbox = <HTMLInputElement>(
        document.getElementById('selectAllCheckbox')
      );
      selectAllCheckbox.checked = false;
    });

    // NOTE: Не совсем понимаю почему именно так ошибку обрабатываешь здесь (и в других подписках тоже)
    // Почему не используешь колбэк для ошибки в подписке?
    this.API.membersAKPS$.subscribe((dataFromAPI: any) => {
      if (dataFromAPI.error) {
        // this.error = dataFromAPI.message;
        this.error = 'Пользователи не найдены'
        this.API.error.next(String(this.error));
      } else {
        this.members = dataFromAPI;
      }
      this.membersDropdown = true;
    });

    // NOTE: Почему preloader именно в API сервисе? По-моему лучше в отдельный сервис вынести
    // И почему он в принципе в сервисе? Разве нельзя в компоненте логику реализовать?
    this.API.preloader$.subscribe((dataFromAPI) => {
      this.preloader = dataFromAPI;
    });

    this.API.editMember$.subscribe((data) => {
      if (data.error) {
        this.error = data.error.message;
        this.API.error.next(String(this.error));
      } else {
        this.API.responseOK.next('Участник успешно изменен');
        this.childEvent.emit();
        this.API.selectedMemberId$.next(undefined);
        this.closeModal();
      }
    });

    this.API.selectedMemberId$.subscribe((id) => {
      console.log(id);
      this.structures.length = 0;
      this.memberID = id;
      this.data.forEach((element: any) => {
        if (element.id == this.memberID) {
          console.log(element.name);
          this.name = element.name;
          console.log(this.name);
          this.card = element.card;
          this.structure = element.subdepartment;
          this.isStudent = element.is_student;
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
    });
  }

  ngAfterViewInit() {
    // Обращение к серверу происходит после того, как пользователь не печатает на протяжении 1.5 секунд
    // NOTE: 1.5 сек как-то много, пусть будет 400 мс
    // Вообще мне очень не нравится этот код, нужно его переработать
    // Зачем таймайт на 4 секунды?
    setTimeout(() => {
      fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          filter(Boolean),
          debounceTime(400),
          distinctUntilChanged(),
          tap(async (text) => {
            console.log(this.input.nativeElement.value);
            const memberName = <HTMLInputElement>this.input.nativeElement.value;
            const preloader = document.getElementById('preloader');
            // NOTE: Вот это здесь зачем например? и async тогда не нужен.
            if (String(memberName) != '') {
              const data = await this.searchInAKSP(memberName);
              console.log(data);
            } else {
              this.membersDropdown = false;
            }
          })
        )
        .subscribe();
    }, 4000);
  }
}
