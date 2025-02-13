import { Component, effect, inject, signal } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { ComponentsModule } from '../../modules/components/components.module';
import { PlaylistService } from '../../services/playlist.service';
import { UtilityService } from '../../services/utility.service';
import { PlaylistFilterComponent } from '../../components/playlist-components/playlist-filter/playlist-filter.component';
import { PlaylistDetailsComponent } from '../../components/playlist-components/playlist-details/playlist-details.component';
import { MatTableDataSource } from '@angular/material/table';
import { Playlist } from '../../models/playlist';
import { AssetLibraryService } from '../../services/asset-library.service';

@Component({
  selector: 'app-playlists',
  imports: [ MaterialUiModule, ComponentsModule, PlaylistFilterComponent, PlaylistDetailsComponent ],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
  providers: [ PlaylistService, UtilityService, AssetLibraryService ]
})
export class PlaylistsComponent {

  playlist = inject(PlaylistService);
  utility = inject(UtilityService);
  showFilter = signal<boolean>(false);

  displayedColumns: string[] = [ 'preview', 'name', 'lastUpdate', 'status', 'actions'];
  DATASOURCE: MatTableDataSource<Playlist> = new MatTableDataSource<Playlist>([]);

  constructor() { 
    effect(() => {
      this.playlist.onFetchPlaylists();
      this.DATASOURCE.data = this.playlist.playlists();    
      console.log(this.DATASOURCE.data);
        
    })
  }

  ngOnInit() { 
    // this.playlist.onFetchPlaylists();
  }
}
