import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersEditModalComponent } from './members-edit-modal.component';

describe('MembersEditModalComponent', () => {
  let component: MembersEditModalComponent;
  let fixture: ComponentFixture<MembersEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
