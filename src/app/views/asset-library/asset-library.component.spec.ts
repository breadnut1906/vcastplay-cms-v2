import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLibraryComponent } from './asset-library.component';

describe('AssetLibraryComponent', () => {
  let component: AssetLibraryComponent;
  let fixture: ComponentFixture<AssetLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
