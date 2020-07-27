import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditModalComponent } from './users-edit-modal.component';

describe('UsersEditModalComponent', () => {
  let component: UsersEditModalComponent;
  let fixture: ComponentFixture<UsersEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});