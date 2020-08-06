import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/main/delete-modal/delete-modal.component.spec.ts
import { DeleteModalComponent } from './delete-modal.component';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteModalComponent ]
=======
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
>>>>>>> 9d51ee37ae226bea204332ec4ac3d9d7275a1922:src/app/ui-components/modal/modal.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:src/app/main/delete-modal/delete-modal.component.spec.ts
    fixture = TestBed.createComponent(DeleteModalComponent);
=======
    fixture = TestBed.createComponent(ModalComponent);
>>>>>>> 9d51ee37ae226bea204332ec4ac3d9d7275a1922:src/app/ui-components/modal/modal.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
