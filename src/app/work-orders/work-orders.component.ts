import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimelineScheduleComponent } from '../timeline-schedule/timeline-schedule.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-work-orders',
  standalone: true,
  imports: [CommonModule,NgSelectModule, TimelineScheduleComponent, FormsModule],
  templateUrl: './work-orders.component.html',
  styleUrl: './work-orders.component.scss',
})
export class WorkOrdersComponent {
  public selectedTimescale: string = 'month';
  public timescales = [
    { value: 'hour', label: 'Hour' },
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ];
}
