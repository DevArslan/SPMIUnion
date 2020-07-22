import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresNavComponent } from './structures-nav.component';

describe('StructuresNavComponent', () => {
  let component: StructuresNavComponent;
  let fixture: ComponentFixture<StructuresNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuresNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
