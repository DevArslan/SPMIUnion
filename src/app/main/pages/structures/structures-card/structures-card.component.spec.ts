import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresCardComponent } from './structures-card.component';

describe('StructuresCardComponent', () => {
  let component: StructuresCardComponent;
  let fixture: ComponentFixture<StructuresCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuresCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
