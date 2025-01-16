import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule, CdkDropList, CdkDropListGroup, CdkDrag, CdkDragPlaceholder  } from '@angular/cdk/drag-drop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDropList, 
    CdkDropListGroup,
  ],
  exports: [
    CommonModule,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDropList, 
    CdkDropListGroup,
    DragDropModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatListModule,
  ]
})
export class MaterialUiModule { }
