import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-timeline-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-schedule.component.html',
  styleUrl: './timeline-schedule.component.scss',
})
export class TimelineScheduleComponent implements OnInit {
  @Input() timeScale: 'hour' | 'day' | 'week' | 'month' = 'day';
  public days: dayjs.Dayjs[] = [];
  public today = dayjs().startOf('day');
  public timelineStart = this.today.subtract(14, 'day');
  public timelineEnd = this.today.add(14, 'day');
  public workCenters = [
    { id: 1, value: 'genesisHardware', label: 'Genesis Hardware' },
    { id: 2, value: 'rodriguesElectrics', label: 'Rodrigues Electrics' },
    { id: 3, value: 'konsultingInc', label: 'Konsulting Inc' },
    { id: 4, value: 'mcMarrowDistribution', label: 'McMarrow Distribution' },
    { id: 5, value: 'spartanManufacturing', label: 'Spartan Manufacturing' },
  ];
  public months = dayjs().get('month');

  ngOnInit(): void {
    let current = this.timelineStart;

    while (current.isBefore(this.timelineEnd)) {
      this.days.push(current);
      current = current.add(1, 'day');
    }
  }
}
