import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSettingsComponent } from './brand-settings.component';

describe('BrandSettingsComponent', () => {
  let component: BrandSettingsComponent;
  let fixture: ComponentFixture<BrandSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
