import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignEditorDialogComponent } from './design-editor-dialog.component';

describe('DesignEditorDialogComponent', () => {
  let component: DesignEditorDialogComponent;
  let fixture: ComponentFixture<DesignEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignEditorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
