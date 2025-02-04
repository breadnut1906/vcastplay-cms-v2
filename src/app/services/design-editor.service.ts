import { Injectable, signal } from '@angular/core';
import { Resolutions, Template } from '../models/template';

@Injectable()
export class DesignEditorService {
  
  orientations: string[] = ['Portrait', 'Landscape'];
  landscape: Resolutions[] = [
    { name: 'Full HD', width: 1920, height: 1080 },
    { name: 'Quad HD', width: 2560, height: 1440 },
    { name: '4K', width: 3840, height: 2160 },
    { name: '5K', width: 5120, height: 2880 },
    { name: '8K', width: 7680, height: 4320 },
    { name: 'HD', width: 1280, height: 720 },
    { name: 'HD+', width: 1366, height: 768 },
    { name: 'HD+', width: 1600, height: 900 }
  ]

  portrait: Resolutions[] = [
    { name: 'Full HD', width: 1080, height: 1920 },
    { name: 'Quad HD', width: 1440, height: 2560 },
    { name: '4K', width: 2160, height: 3840 },
    { name: '5K', width: 2880, height: 5120 },
    { name: '8K', width: 4320, height: 7680 },
    { name: 'HD', width: 720, height: 1280 },
    { name: 'HD+', width: 768, height: 1366 },
    { name: 'HD+', width: 900, height: 1600 }
  ]

  template = signal<Template | null>(null);

  constructor() { }

  getResolutions(orientation: string): Resolutions[] {
    return orientation === 'Portrait'? this.portrait : this.landscape;
  }

  onNewTemplate(template: Template) {
    this.template.set(template);
  }
}
