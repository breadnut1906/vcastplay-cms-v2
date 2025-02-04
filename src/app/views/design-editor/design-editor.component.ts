import { Component, effect, ElementRef, HostListener, inject, Renderer2, ViewChild } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { DesignEditorService } from '../../services/design-editor.service';
import { NgxMoveableComponent } from 'ngx-moveable';
import { NgxSelectoModule } from 'ngx-selecto';
import { FormControl } from '@angular/forms';
import { DesignEditorDialogComponent } from '../../components/design-editor-dialog/design-editor-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Template } from '../../models/template';

@Component({
  selector: 'app-design-editor',
  imports: [ MaterialUiModule, NgxMoveableComponent, NgxSelectoModule, DesignEditorDialogComponent ],
  templateUrl: './design-editor.component.html',
  styleUrl: './design-editor.component.scss',
  providers: [ DesignEditorService ]
})
export class DesignEditorComponent {
  
  @ViewChild("moveableRef") moveableRef!: NgxMoveableComponent;
  @ViewChild("screenContainer") screenContainer!: ElementRef<HTMLDivElement>;

  @ViewChild("testCanvas") testCanvas!: ElementRef<HTMLCanvasElement>;

  editor = inject(DesignEditorService);

  resolutions: FormControl = new FormControl('');

  private renderer = inject(Renderer2);

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

  }

  ngAfterViewInit() {
    // this.editor.setCanvasSize(this.testCanvas, 800, 600);
  }

  onClickNewCanvas(dialogTemplate: any) {
    this.dialog.open(dialogTemplate, {
      autoFocus: false,
    })
  }

  onClickAddLayer() {
    const template = this.templateData;
    template.layers.push({ top: 0, left: 0, height: 200, width: 300 });
    this.elementGuidelines = template.layers.map((layer: any, index: any) => (`.layer-content${index+1}`));
  }

  async onClickSaveTemplate() {
    // const contentElement = this.screenContainer.nativeElement;

    // // Extract component-specific SCSS (compiled as CSS)
    // const styles = Array.from(document.head.querySelectorAll('style'))
    // .map(style => style.innerHTML)
    // .join('\n');

    // // Convert all images to Base64
    // const updatedContent = await this.convertMediaToBase64(contentElement.outerHTML);

    // const htmlContent = `
    //   <!DOCTYPE html>
    //   <html>
    //     <head>
    //       <meta charset="UTF-8">
    //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //       <title>Exported Content</title>
    //       <style>
    //         ${styles}
    //           .editor-container {
    //               position: relative;
    //               display: flex;
    //               flex-direction: column;
    //               justify-content: center;
    //               align-items: center;
    //               height: 100%;
    //               padding: 2%;
    //               background-color: var(--mat-sys-surface-dim);
    //               background-image: radial-gradient(black 1px, transparent 0);
    //               background-size: 40px 40px;
    //               background-position: -19px -19px;
    //             }

    //             .screen-container {
    //                 position: relative;
    //                 height: 50%;
    //                 width: 100%;
    //                 background-color: #fff;
    //             }

    //             .layer-content {
    //                 position: absolute;
    //                 display: flex;
    //                 flex-direction: column;
    //                 justify-content: center;
    //                 align-items: center;
    //                 background-color: var(--mat-sys-surface-dim);
    //                 box-sizing: border-box;
    //                 height: 100px;
    //                 width: 100px;
    //             }
    //       </style>
    //       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    //       <script script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    //     </head>
    //     <body>
    //       <div class="editor-container">
    //         ${updatedContent}
    //       </div>
    //     </body>
    //   </html>
    // `

    // // Create and trigger file download
    // const blob = new Blob([htmlContent], { type: 'text/html' });
    // const a = this.renderer.createElement('a');
    // a.href = URL.createObjectURL(blob);
    // a.download = 'exported-content.html';
    // a.click();
    // URL.revokeObjectURL(a.href);
    
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


  // Test methods
  // Convert images and videos to Base64 for full offline access
  async convertMediaToBase64(htmlContent: string): Promise<string> {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const mediaElements = doc.querySelectorAll('img, video source');

    for (const element of mediaElements) {
      const src = element.getAttribute('src');
      if (src && !src.startsWith('data:')) {
        try {
          const base64Data = await this.fetchAsBase64(src);
          element.setAttribute('src', base64Data);
        } catch (error) {
          console.error(`Error converting ${src} to Base64:`, error);
        }
      }
    }

    return doc.body.innerHTML;
  }

  // Fetch and convert a file to Base64
  async fetchAsBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
