import { Component } from '@angular/core';
import { TimelineScheduleComponent } from '../../timeline-schedule/timeline-schedule.component';
import { WorkOrdersComponent } from '../../work-orders/work-orders.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WorkOrdersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
