import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimelineScheduleComponent } from '../timeline-schedule/timeline-schedule.component';
import { FormsModule } from '@angular/forms';
import { WorkOrderDetailsComponent } from '../work-order-details/work-order-details.component';

@Component({
  selector: 'app-work-orders',
  standalone: true,
  imports: [
    CommonModule,
    NgSelectModule,
    TimelineScheduleComponent,
    WorkOrderDetailsComponent,
    FormsModule,
  ],
  templateUrl: './work-orders.component.html',
  styleUrl: './work-orders.component.scss',
})
export class WorkOrdersComponent {
  public selectedOrder: any = null;
  public selectedTimescale: 'hour' | 'day' | 'week' | 'month' = 'month';
  public timescales = [
    { value: 'hour', label: 'Hour' },
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ];

  onOrderSelected(order: any) {
    this.selectedOrder = order;
  }

  closeDetails() {
    this.selectedOrder = null;
  }
}
