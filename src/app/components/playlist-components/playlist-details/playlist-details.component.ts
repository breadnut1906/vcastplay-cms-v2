import { Component, effect, inject } from '@angular/core';
import { PlaylistService } from '../../../services/playlist.service';
import { AssetLibraryService } from '../../../services/asset-library.service';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { Assets } from '../../../models/asset-library';
import { FormControl, FormGroup } from '@angular/forms';
import { PlaylistContent } from '../../../models/playlist';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-playlist-details',
  imports: [ MaterialUiModule ],
  templateUrl: './playlist-details.component.html',
  styleUrl: './playlist-details.component.scss'
})
export class PlaylistDetailsComponent {

  playlist = inject(PlaylistService);
  assets = inject(AssetLibraryService);

  assetLists: Assets[] = [];

  playListForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    transition: new FormGroup({
      isBlackGap: new FormControl(false),
      type: new FormControl(''),
      speed: new FormControl(0),
    }),
    contents: new FormControl<PlaylistContent[]>([]),
    status: new FormControl(''),
    createdOn: new FormControl(''),
    lastUpdate: new FormControl(''),
  });

  constructor() { 
    effect(() => {

      // Create new playlist
      if (!this.playlist.isEditMode()) {  
        const assets = this.assets.assets();
        this.assetLists = assets;
      }
    })
  }

  ngOnInit() {this.assets.onFetchAssets();
  }

  onClickSave() {
    this.playlist.onSavePlaylist();
  }
  
  onDropNewPlayList(event: CdkDragDrop<any[]>) {
    const { previousContainer, container, previousIndex, currentIndex } = event;    
    if (previousContainer === container) {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
    }
  }

  get contents() {
    return this.playListForm.get('contents');
  }
}
