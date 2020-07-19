import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersAddModalComponent } from './members-add-modal.component';

describe('MembersAddModalComponent', () => {
  let component: MembersAddModalComponent;
  let fixture: ComponentFixture<MembersAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
