import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdepartmentsModalComponent } from './subdepartments-modal.component';

describe('SubdepartmentsModalComponent', () => {
  let component: SubdepartmentsModalComponent;
  let fixture: ComponentFixture<SubdepartmentsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdepartmentsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdepartmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
