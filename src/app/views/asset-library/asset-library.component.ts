import { Component, effect, inject, signal } from '@angular/core';
import { AssetLibraryService } from '../../services/asset-library.service';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { UtilityService } from '../../services/utility.service';
import { Assets } from '../../models/asset-library';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-asset-library',
  imports: [ MaterialUiModule ],
  templateUrl: './asset-library.component.html',
  styleUrl: './asset-library.component.scss',
  providers: [ AssetLibraryService, UtilityService ]
})
export class AssetLibraryComponent {

  assetLibraryService = inject(AssetLibraryService);
  utility = inject(UtilityService);
  showFilter = signal<boolean>(false);

  displayColumns: string[] = [ 'preview', 'name', 'type', 'category', 'info', 'lastUpdate', 'actions'];
  DATASOURCE: MatTableDataSource<Assets> = new MatTableDataSource<Assets>();

  constructor() {
    effect(() => {
      this.assetLibraryService.onFetchAssets();
      this.DATASOURCE.data = this.assetLibraryService.assets();

      console.log(this.DATASOURCE.data);
      
    })
  }
}
