import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAddModalComponent } from './users-add-modal.component';

describe('UsersAddModalComponent', () => {
  let component: UsersAddModalComponent;
  let fixture: ComponentFixture<UsersAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
