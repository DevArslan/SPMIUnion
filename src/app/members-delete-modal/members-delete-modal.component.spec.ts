import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersDeleteModalComponent } from './members-delete-modal.component';

describe('MembersDeleteModalComponent', () => {
  let component: MembersDeleteModalComponent;
  let fixture: ComponentFixture<MembersDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
