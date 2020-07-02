import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresDeleteModalComponent } from './structures-delete-modal.component';

describe('StructuresDeleteModalComponent', () => {
  let component: StructuresDeleteModalComponent;
  let fixture: ComponentFixture<StructuresDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuresDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
