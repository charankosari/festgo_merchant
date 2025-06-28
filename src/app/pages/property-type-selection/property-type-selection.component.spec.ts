import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeSelectionComponent } from './property-type-selection.component';

describe('PropertyTypeSelectionComponent', () => {
  let component: PropertyTypeSelectionComponent;
  let fixture: ComponentFixture<PropertyTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTypeSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
