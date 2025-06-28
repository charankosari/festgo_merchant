import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceLegalComponent } from './finance-legal.component';

describe('FinanceLegalComponent', () => {
  let component: FinanceLegalComponent;
  let fixture: ComponentFixture<FinanceLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceLegalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
