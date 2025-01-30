import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { AssetLibraryService } from '../../services/asset-library.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { UtilityService } from '../../services/utility.service';
import { Assets } from '../../models/asset-library';

@Component({
  selector: 'app-assets-details',
  imports: [ MaterialUiModule ],
  templateUrl: './assets-details.component.html',
  styleUrl: './assets-details.component.scss'
})
export class AssetsDetailsComponent {

  assetLibraryService = inject(AssetLibraryService);
  utility = inject(UtilityService);

  fileUpload = viewChild.required<HTMLInputElement>('fileUpload');

  details = signal<Assets | null>(null);

  assetsForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    code: new FormControl(null),
    name: new FormControl(null),
    type: new FormControl(null),
    file: new FormControl<File | null>(null),
    category: new FormControl(null),
    subCategory: new FormControl(null),
    fileDetails: new FormGroup({
      orientation: new FormControl(null),
      resolution: new FormControl(null),
      size: new FormControl(null),
    }),
    audience: new FormGroup({
      targetAge: new FormControl(null),
      targetGender: new FormControl(null),
      targetLocation: new FormControl(null),
      targetInterest: new FormControl(null),
    }),
    availability: new FormControl(null),
    lastUpdate: new FormControl(null),
  })

  constructor() { 
    effect(() => {
      if(this.assetLibraryService.isEditMode() || this.assetLibraryService.isViewMode()) {
        const data: any = this.assetLibraryService.selectedAsset();
        this.details.set(data);        
        this.assetsForm.patchValue(data);   
      }
    })
  }

  ngOnInit() {
  
  }

  onClickSave(asset: Assets) {
    this.assetLibraryService.onSaveAssets(asset);
    this.assetsForm.reset();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];      
      this.onGetFileDetails(file);
    }
  }

  onGetFileDetails(file: File) {
    // Check if file is an image or video or audio or document
    const fileType = file.type.split('/')[0];

    switch(fileType) {
      case 'image':
        this.onGetImageDetails(file);
        break;
      case 'video':
        this.onGetVideoDetails(file);
        break;
      case 'audio':
        this.onGetAudioDetails(file);
        break;
      default:
        this.onGetDocumentDetails(file);
        break;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];      
      this.onGetFileDetails(file);
    }
  }

  onGetImageDetails(file: File) {
    const img: any = new Image();
    const reader = new FileReader();

    reader.onload = (e: any) => {
      img.src = e.target.result;
    }

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      const resolution = `${width}x${height}`;

      this.assetsForm.patchValue({ 
        file, 
        name: file.name, 
        type: 'Image', 
        fileDetails: { 
          size: this.utility.formatFileSize(file.size), 
          orientation: height > width? 'Portrait' : 'Landscape',  
          resolution 
        } 
      });
    }
    reader.readAsDataURL(file); // Start reading the file
  }

  onGetVideoDetails(file: File) {
    const video = document.createElement('video');
    const reader = new FileReader();

    reader.onload = (e: any) => {
      video.src = e.target.result;
    }

    video.onloadedmetadata = () => {
      const resolution = `${video.videoWidth}x${video.videoHeight}`;
      const orientation = video.videoWidth > video.videoHeight? 'Portrait' : 'Landscape';
      this.assetsForm.patchValue({ 
        file, 
        name: file.name, 
        type: 'Video', 
        fileDetails: { 
          size: this.utility.formatFileSize(file.size), 
          orientation, 
          resolution 
        } 
      });
    }
    reader.readAsDataURL(file); // Start reading the file
  }

  onGetAudioDetails(file: File) {
    this.assetsForm.patchValue({ 
      file, 
      name: file.name, 
      type: 'Audio', 
      fileDetails: { 
        size: this.utility.formatFileSize(file.size), 
        orientation: null,  
        resolution: null,
      } 
    });
  }

  onGetDocumentDetails(file: File) {    
    this.assetsForm.patchValue({ 
      file, 
      name: file.name, 
      type: 'Document',  
      fileDetails: { 
        size: this.utility.formatFileSize(file.size), 
        orientation: null,  
        resolution: null,
      } 
    });
  }
}
