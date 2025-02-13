import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { PlaylistService } from '../../../services/playlist.service';
import { AssetLibraryService } from '../../../services/asset-library.service';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { Assets } from '../../../models/asset-library';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PlaylistContent } from '../../../models/playlist';
import { UtilityService } from '../../../services/utility.service';
import * as HtmlDurationPicker from 'html-duration-picker';
@Component({
  selector: 'app-playlist-details',
  imports: [ MaterialUiModule ],
  templateUrl: './playlist-details.component.html',
  styleUrl: './playlist-details.component.scss'
})
export class PlaylistDetailsComponent {

  playlist = inject(PlaylistService);
  assets = inject(AssetLibraryService);
  utiliy = inject(UtilityService);

  assetLists: Assets[] = [];

  filterAssets: FormControl = new FormControl(null);

  playListForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [ Validators.required ]),
    description: new FormControl('', [ Validators.required ]),
    isManual: new FormControl(false),
    transition: new FormGroup({
      isBlackGap: new FormControl(false),
      type: new FormControl('', [ Validators.required ]),
      speed: new FormControl(0, [ Validators.required ]),
    }),
    contents: new FormControl<Array<PlaylistContent[]>>([], [ Validators.required ]),
    duration: new FormControl(0, [ Validators.required ]),
    status: new FormControl(''),
    createdOn: new FormControl(''),
    lastUpdate: new FormControl(''),
  });
  
  updatedPlaylist = effect(() => {

    // Create new playlist
    if (!this.playlist.isEditMode()) {  
      const assets = this.assets.filteredAssets();        
      this.assetLists = assets;
    }

    this.filterAssets.valueChanges.subscribe((filter) => {
      this.assets.assetFilters.set({ type: filter });
      this.assetLists = this.assets.filteredAssets();
    });
  })

  ngOnInit() {
    this.assets.onFetchAssets();
  }

  ngAfterViewInit() {
    HtmlDurationPicker.init();
  }

  onClickSave() {
    if (this.playListForm.invalid) {
      this.utiliy.onShowNotification('Please fill out all required fields.', '', 'error');
      return;
    }
    // this.playlist.onSavePlaylist();
    console.log(this.playListForm.value);
  }
  
  onClickReset() {
    this.playListForm.reset();
    console.log(this.playListForm.value);
    this.contents?.patchValue([])
  }

  onClickCancel() {
    this.playlist.onCancelPlaylist();
    this.playListForm.reset();
    this.contents?.patchValue([])
  }

  onStartDrag(event: CdkDragDrop<any[]>) { 
    const { previousContainer } = event;
    previousContainer.data = [ ...this.assetLists ];
  }
  
  onDropNewPlayList(event: CdkDragDrop<any[]>) {
    const { previousContainer, container, previousIndex, currentIndex, item } = event;

    if (previousContainer === container) {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      
      // Check if asset already exists in playlist
      if (this.contents?.value.find((a: any) => a.content.id == item.data.id)) {
        this.utiliy.onShowNotification('Asset already exists in playlist.', '', 'error');
        return;
      }

      // Add new asset to playlist
      const newContent: PlaylistContent = { content: item.data, duration: 0 };
      this.contents?.value.push(newContent);
    }
  }

  onRemoveAsset(asset: Assets) {
    const index = this.contents?.value.findIndex((a: any) => a.id == asset.id);
    if (index!== -1) {
      this.contents?.value.splice(index, 1);
    }
  }

  get contents() {
    return this.playListForm.get('contents');
  }

  get type() {
    return this.playListForm.get('type');
  }
}
