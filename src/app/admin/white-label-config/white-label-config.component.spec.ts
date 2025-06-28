import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteLabelConfigComponent } from './white-label-config.component';

describe('WhiteLabelConfigComponent', () => {
  let component: WhiteLabelConfigComponent;
  let fixture: ComponentFixture<WhiteLabelConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiteLabelConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteLabelConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
