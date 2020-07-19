import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDepartmentsAddModalComponent } from './sub-departments-add-modal.component';

describe('SubDepartmentsAddModalComponent', () => {
  let component: SubDepartmentsAddModalComponent;
  let fixture: ComponentFixture<SubDepartmentsAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDepartmentsAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDepartmentsAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
