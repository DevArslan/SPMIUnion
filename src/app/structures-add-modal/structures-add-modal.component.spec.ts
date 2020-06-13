import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresAddModalComponent } from './structures-add-modal.component';

describe('StructuresAddModalComponent', () => {
  let component: StructuresAddModalComponent;
  let fixture: ComponentFixture<StructuresAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuresAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
