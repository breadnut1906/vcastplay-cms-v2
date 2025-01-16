import { Component, ElementRef, inject, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { ComponentsModule } from '../../modules/components/components.module';
import { DashboardService } from '../../services/dashboard.service';
import { wrapGrid } from 'animate-css-grid';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  imports: [ MaterialUiModule, ComponentsModule, ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [ DashboardService ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  store = inject(DashboardService);

  widgetsOpen = signal(false);

  dashboard = viewChild.required<ElementRef>('dashboard');

  clearAnimations = () => {};

  ngOnInit(): void {
    const { unwrapGrid } = wrapGrid(this.dashboard().nativeElement, { duration: 300 });
    this.clearAnimations = unwrapGrid;
  }
  
  ngOnDestroy(): void {
    this.clearAnimations();
  }

  drop(event: CdkDragDrop<number, any>) {
    const { previousContainer, container, item: { data } } = event;    

    if (data) {
      this.store.insertWidgetAtPosition(data, container.data);
      return;
    }

    this.store.updateWidgetPosition(previousContainer.data, container.data)
  }

  widgetPutBack(event: CdkDragDrop<number, any>) {
    const { previousContainer } = event;
    this.store.removeWidget(previousContainer.data);
  }
}
