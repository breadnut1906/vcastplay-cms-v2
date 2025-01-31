import { Injectable, signal } from '@angular/core';
import { Playlist } from '../models/playlist';

@Injectable()
export class PlaylistService {
  
  isDrawer = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  isViewMode = signal<boolean>(false);

  playlists = signal<Playlist[]>([]);
  selectedPlaylist = signal<Playlist | null>(null);  

  constructor() { }

  onFetchPlaylists() {
    // Fetch playlists from server
    this.playlists.set([
      {
        id: 1,
        name: 'New Playlist',
        description: 'This is a new playlist',
        isManual: false,
        transition: {
          isBlackGap: true,
          type: 'fade',
          speed: 1
        },
        contents: [],
        tag: '',
        duration: 0,
        createdOn: '2022-01-01T00:00:00Z',
        status: 'Active',
        lastUpdate: '2022-01-01T00:00:00Z',
      }
    ]);
    
  }

  onNewPlaylist() {
    this.isDrawer.set(true);
    this.isEditMode.set(false);
    this.selectedPlaylist.set(null);
  }

  onEditPlaylist(playlist: Playlist) {
    this.isDrawer.set(true);
    this.isEditMode.set(true);
    this.selectedPlaylist.set(playlist);
  }

  onSavePlaylist() {
    this.isDrawer.set(false);
    this.selectedPlaylist.set(null);
    this.isEditMode.set(false);
  }

  onCancelPlaylist() {
    this.isDrawer.set(false);
    this.selectedPlaylist.set(null);
  }

  onDeletePlaylist(playlist: Playlist) {

  }
}
