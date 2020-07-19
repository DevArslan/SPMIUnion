import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDepartmentsEditModalComponent } from './sub-departments-edit-modal.component';

describe('SubDepartmentsEditModalComponent', () => {
  let component: SubDepartmentsEditModalComponent;
  let fixture: ComponentFixture<SubDepartmentsEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDepartmentsEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDepartmentsEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
