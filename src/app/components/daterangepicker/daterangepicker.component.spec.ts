import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaterangepickerComponent } from './daterangepicker.component';

describe('DaterangepickerComponent', () => {
  let component: DaterangepickerComponent;
  let fixture: ComponentFixture<DaterangepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaterangepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaterangepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
