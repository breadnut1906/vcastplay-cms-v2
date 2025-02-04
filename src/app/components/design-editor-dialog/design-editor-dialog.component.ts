import { Component, inject } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { DesignEditorService } from '../../services/design-editor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Resolutions } from '../../models/template';

@Component({
  selector: 'app-design-editor-dialog',
  imports: [ MaterialUiModule ],
  templateUrl: './design-editor-dialog.component.html',
  styleUrl: './design-editor-dialog.component.scss'
})
export class DesignEditorDialogComponent {

  editor = inject(DesignEditorService);
  resolutions: Resolutions[] = [];

  templateForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('Canvas test name', [ Validators.required ]),
    description: new FormControl('Canvas test description', [ Validators.required ]),
    category: new FormControl(null),
    canvas: new FormControl({ width: 0, height: 0 }, [ Validators.required ]),
    orientation: new FormControl(null, [ Validators.required ]),
    layers: new FormControl([], { nonNullable: true }),
    zoomScale: new FormControl(0.5),
    createdOn: new FormControl(null),
    lastUpdate: new FormControl(null)
  });

  constructor() {
    this.orientation?.valueChanges.subscribe((orientation) => {
      this.resolutions = this.editor.getResolutions(orientation);
    });
  }

  onCreateNewCanvas() {
    this.editor.onNewTemplate(this.templateForm.value);
  }

  onClickCancel() {
    this.templateForm.reset();
  }

  get orientation() {
    return this.templateForm.get('orientation');
  }
}
