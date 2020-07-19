import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresTableComponent } from './structures-table.component';

describe('StructuresTableComponent', () => {
  let component: StructuresTableComponent;
  let fixture: ComponentFixture<StructuresTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuresTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
