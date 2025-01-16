import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineScreenComponent } from './online-screen.component';

describe('OnlineScreenComponent', () => {
  let component: OnlineScreenComponent;
  let fixture: ComponentFixture<OnlineScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
