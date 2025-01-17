import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenRegistrationComponent } from './screen-registration.component';

describe('ScreenRegistrationComponent', () => {
  let component: ScreenRegistrationComponent;
  let fixture: ComponentFixture<ScreenRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
