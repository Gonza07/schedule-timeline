import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

@Component({
  selector: 'app-timeline-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-schedule.component.html',
  styleUrl: './timeline-schedule.component.scss',
})
export class TimelineScheduleComponent implements OnInit, OnChanges {
  @Input() timeScale: 'hour' | 'day' | 'week' | 'month' = 'day';
  public timeSlots: dayjs.Dayjs[] = [];
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['timeScale']) {
      this.generateTimeSlots();
    }
  }

  private generateTimeSlots() {
    this.timeSlots = [];

    const today = dayjs().startOf('day');

    let start: dayjs.Dayjs;
    let end: dayjs.Dayjs;
    let unit: dayjs.ManipulateType;

    switch (this.timeScale) {
      case 'hour':
        start = today.subtract(24, 'hour');
        end = today.add(24, 'hour');
        unit = 'hour';
        break;

      case 'week':
        start = today.subtract(8, 'week').startOf('week');
        end = today.add(8, 'week').endOf('week');
        unit = 'week';
        break;

      case 'month':
        start = today.subtract(6, 'month').startOf('month');
        end = today.add(6, 'month').endOf('month');
        unit = 'month';
        break;

      case 'day':
      default:
        start = today.subtract(14, 'day');
        end = today.add(14, 'day');
        unit = 'day';
        break;
    }

    let current = start;

    while (current.isBefore(end)) {
      this.timeSlots.push(current);
      current = current.add(1, unit);
    }
  }

  public formatHeader(slot: dayjs.Dayjs) {
    switch (this.timeScale) {
      case 'hour':
        return slot.format('HH:mm');

      case 'week':
        return `W${slot.week()}`;

      case 'month':
        return slot.format('MMM YYYY');

      case 'day':
      default:
        return slot.format('DD MMM');
    }
  }
}
