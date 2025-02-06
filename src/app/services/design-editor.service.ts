import { Injectable, signal } from '@angular/core';
import { Template } from '../models/template';

@Injectable()
export class DesignEditorService {
  
  orientations: string[] = ['Portrait', 'Landscape'];

  template = signal<Template | null>(null);

  constructor() { }

  onNewTemplate(template: Template) {
    this.template.set(template);
  }
}
