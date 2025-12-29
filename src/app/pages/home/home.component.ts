import { Component } from '@angular/core';
import { TimelineScheduleComponent } from '../../timeline-schedule/timeline-schedule.component';
import { WorkOrdersComponent } from '../../work-orders/work-orders.component';
import { WorkOrderDetailsComponent } from '../../work-order-details/work-order-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WorkOrdersComponent,TimelineScheduleComponent, WorkOrderDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
