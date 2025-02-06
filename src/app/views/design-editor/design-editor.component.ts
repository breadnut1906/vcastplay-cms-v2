import { Component, effect, ElementRef, HostListener, inject, Renderer2, ViewChild } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { DesignEditorService } from '../../services/design-editor.service';
import { NgxMoveableComponent } from 'ngx-moveable';
import { NgxSelectoModule } from 'ngx-selecto';
import { FormControl } from '@angular/forms';
import { DesignEditorDialogComponent } from '../../components/design-editor-dialog/design-editor-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Template } from '../../models/template';
import { ScreenService } from '../../services/screen.service';

@Component({
  selector: 'app-design-editor',
  imports: [ MaterialUiModule, NgxMoveableComponent, NgxSelectoModule, DesignEditorDialogComponent ],
  templateUrl: './design-editor.component.html',
  styleUrl: './design-editor.component.scss',
  providers: [ DesignEditorService, ScreenService ]
})
export class DesignEditorComponent {
  
  @ViewChild("moveableRef") moveableRef!: NgxMoveableComponent;
  @ViewChild("screenContainer") screenContainer!: ElementRef<HTMLDivElement>;

  @ViewChild("testCanvas") testCanvas!: ElementRef<HTMLCanvasElement>;

  editor = inject(DesignEditorService);
  screen = inject(ScreenService);

  resolutions: FormControl = new FormControl('');

  targets: Array<HTMLElement | SVGElement> = [];

  elementGuidelines: any;

  // Screen bounds and layer properties
  bounds: any = { "left": 0, "top": 0, "right": 0, "bottom": 0, "position": "css" };
  snapDirections: any = { "left": true, "right": true, "top": true, "bottom": true, "center": true, "middle": true };
  elementSnapDirections: any = { "left": true, "right": true, "top": true, "bottom": true, "center": true, "middle": true };

  templateData!: Template; 

  constructor(private dialog: MatDialog) {

    effect(() => {
      const template = this.editor.template();
      if (template) this.templateData = template;
      console.log(template);
      
    })
  }

  ngOnInit() {
    this.screen.onFetchScreens();
  }

  ngAfterViewInit() {
    // this.editor.setCanvasSize(this.testCanvas, 800, 600);
  }

  onClickNewCanvas(dialogTemplate: any) {
    this.dialog.open(dialogTemplate, {
      autoFocus: false,
      width: '800px',
    })
  }

  onClickAddLayer() {
    const template = this.templateData;
    template.layers.push({ top: 0, left: 0, height: 200, width: 300 });
    this.elementGuidelines = template.layers.map((layer: any, index: any) => (`.layer-content${index+1}`));
  }

  async onClickSaveTemplate() {
    console.log(this.templateData);
  }

  // Mouse event handlers
  @HostListener('wheel', ['$event'])
  onMouseWheel(event: WheelEvent) {
    event.preventDefault();    
    if (event.deltaY < 0) {
      this.onZoomIn();
    } else {
      this.onZoomOut();
    }
  }

  onZoomIn() {
    const { zoomScale, ...data } = this.templateData;
    this.templateData = {...data, zoomScale: Math.min(zoomScale + 0.1, 3) };
  }

  onZoomOut() {
    const { zoomScale,...data } = this.templateData;
    this.templateData = {...data, zoomScale: Math.max(zoomScale - 0.1, 0.1) };
  }

  // Movable and Selecto methods
  onRenderScreen(e: any) {
    const layerId = e.target.id;    
    e.target.style.cssText += e.cssText;
    const layer = this.templateData.layers[layerId];
    this.templateData.layers[layerId] = { ...layer, css: e.cssText };    
  }

  onRenderGroup(e: any) {
    e.events.forEach((ev: any) => {
      ev.target.style.cssText += ev.cssText;
    });
  }
  
  onDrag(e: any) {
    const layerId = e.target.id;
    const layer = this.templateData.layers[layerId];
    this.templateData.layers[layerId] = { ...layer, css: e.cssText };    
  }

  onBound(e: any) {
    console.log(e.cssText);
    
  }

  onDragStart(e: any) {
    const moveable = this.moveableRef!;
    const target = e.inputEvent.target;
    if (target.tagName === "BUTTON" || moveable?.isMoveableElement(target)
        || this.targets.some(t => t === target || t.contains(target))
    ) {
      e.stop();
    }
  }
  onSelectEnd(e: any) {
      const moveable: any = this.moveableRef!;
      if (e.isDragStart) {
          e.inputEvent.preventDefault();
          moveable.waitToChangeTarget().then(() => {
            moveable.dragStart(e.inputEvent);
          });
      }
      this.targets = e.selected; 
  }
}
