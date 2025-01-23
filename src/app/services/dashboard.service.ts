import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Widget } from '../models/widget';
import { OnlineScreenComponent } from '../components/dashboard-components/online-screen/online-screen.component';
import { OfflineScreenComponent } from '../components/dashboard-components/offline-screen/offline-screen.component';
import { SubscriptionPlanComponent } from '../components/dashboard-components/subscription-plan/subscription-plan.component';
import { StorageService } from './storage.service';

@Injectable()
export class DashboardService {

  private activeResizeId: number | null = null; // Track the currently resizing widget's ID
  private isResizing = false; // Add a flag to track resizing state
  private startX: number = 0;
  private startY: number = 0;
  private initialRows: number = 0;
  private initialColumns: number = 0;
  
  // List of all widgets
  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Online Screens',
      content: OnlineScreenComponent
    },
    {
      id: 2,
      label: 'Offline Screens',
      content: OfflineScreenComponent
    },
    {
      id: 3,
      label: 'Storage Usage',
      content: SubscriptionPlanComponent
    },
    {
      id: 4,
      label: 'Subscription Plans',
      content: SubscriptionPlanComponent
    },
  ])

  // List of widgets added to the dashboard
  addedWidgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Online Screens',
      content: OnlineScreenComponent
    },
  ]);

  // Show all available widgets that is not added to the dashboard
  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map(w => w.id);
    return this.widgets().filter(w => !addedIds.includes(w.id));
  })

  saveWidgets = effect(() => {
    const widgetsWithOutContent: Partial<Widget>[] = this.addedWidgets().map(w => ({ ...w }));
    widgetsWithOutContent.forEach(w => delete w.content);

    this.storage.set('dashboardWidgets', JSON.stringify(widgetsWithOutContent))
  })

  fetchWidgets() {
    const widgetsAsString = this.storage.get('dashboardWidgets');
    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Widget[];
      widgets.forEach(widget => {
        const content = this.widgets().find(w => w.id == widget.id)?.content;
        if (content) widget.content = content;
      });

      this.addedWidgets.set(widgets)
    }
  }

  constructor(private storage: StorageService) { 
    this.fetchWidgets();
  }

  // Methods
  addWidget(widget: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), { ...widget }])
  }

  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addedWidgets().findIndex(w => w.id == id);
    if (index !== -1) {
      const newWidgets = [ ...this.addedWidgets() ];
      newWidgets[index] = { ...newWidgets[index], ...widget };
      this.addedWidgets.set(newWidgets);
    }
  }

  onResizeStart(id: number, event: MouseEvent) {
    event.preventDefault();
    this.isResizing = true;   
    this.activeResizeId = id; // Set the active widget being resized 
    
    const index = this.addedWidgets().findIndex(w => w.id == id);
    
    if (index !== -1) {
      const newWidgets = [ ...this.addedWidgets() ];      

      this.startX = event.clientX;
      this.startY = event.clientY;
      this.initialRows = newWidgets[index].rows ?? 1;
      this.initialColumns = newWidgets[index].columns ?? 1;

      document.addEventListener('mousemove', this.onResizing);
      document.addEventListener('mouseup', this.onResizeEnd);
    }
  }

  onResizing(event: MouseEvent) {
    if (!this.isResizing || this.activeResizeId === null) return;
    
    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;

    const newColumns = Math.max(1, this.initialColumns + Math.round(dx / 200));
    const newRows = Math.max(1, this.initialRows + Math.round(dy / 150));
    
    const columns = Math.min(newColumns, 4)
    const rows = Math.min(newRows, 4);

    this.updateWidget(this.activeResizeId, { rows, columns });
  }

  onResizeEnd = (): void => {
    if (!this.isResizing || this.activeResizeId === null) return;
  
    this.isResizing = false;
    this.activeResizeId = null; // Reset active widget ID

    document.removeEventListener('mousemove', this.onResizing);
    document.removeEventListener('mouseup', this.onResizeEnd);
  };

  moveWidgetToLeft(id: number) {
    const index = this.addedWidgets().findIndex(w => w.id == id);
    if (index == 0) {
      return;
    }

    const newWidgets = [ ...this.addedWidgets() ];
    [ newWidgets[index], newWidgets[index - 1] ] = [ { ...newWidgets[index - 1] }, { ...newWidgets[index] }];
    this.addedWidgets.set(newWidgets);

  }

  moveWidgetToRight(id: number) {
    const index = this.addedWidgets().findIndex(w => w.id == id);
    if (index == this.addedWidgets().length - 1) {
      return;
    }

    const newWidgets = [ ...this.addedWidgets() ];
    [ newWidgets[index], newWidgets[index + 1] ] = [ { ...newWidgets[index + 1] }, { ...newWidgets[index] }];
    this.addedWidgets.set(newWidgets);
  }

  removeWidget(id: number) {
    this.addedWidgets.set(this.addedWidgets().filter(w => w.id !== id));
  }

  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number) {
    const sourceIndex = this.addedWidgets().findIndex(w => w.id == sourceWidgetId)
    if (sourceIndex == -1) return;

    const newWidgets = [ ...this.addedWidgets() ];
    const sourceWidget = newWidgets.splice(sourceIndex, 1)[0];

    const targetIndex = newWidgets.findIndex(w => w.id == targetWidgetId);
    if (targetIndex == -1) return;

    const insertAt = targetIndex == sourceIndex ? targetIndex + 1 : targetIndex;

    newWidgets.splice(insertAt, 0, sourceWidget);
    this.addedWidgets.set(newWidgets);
  }

  insertWidgetAtPosition(sourceWidgetId: number, destWidgetId: number) {
    const widgetToAdd = this.widgetsToAdd().find(w => w.id == sourceWidgetId);
    if (!widgetToAdd) return;

    const indexOfDestWidget = this.addedWidgets().findIndex(w => w.id == destWidgetId);
    const positionToAdd = indexOfDestWidget == -1 ? this.addedWidgets().length : indexOfDestWidget;

    const newWidgets = [ ...this.addedWidgets() ];
    newWidgets.splice(positionToAdd, 0, widgetToAdd);
    this.addedWidgets.set(newWidgets);
  }
}
