import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDepartmentsDelModalComponent } from './sub-departments-del-modal.component';

describe('SubDepartmentsDelModalComponent', () => {
  let component: SubDepartmentsDelModalComponent;
  let fixture: ComponentFixture<SubDepartmentsDelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDepartmentsDelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDepartmentsDelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
