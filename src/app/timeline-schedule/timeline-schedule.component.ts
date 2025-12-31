import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
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
  @Output() orderSelected = new EventEmitter<any>();
  public timeSlots: dayjs.Dayjs[] = [];
  public days: dayjs.Dayjs[] = [];
  public today = dayjs().startOf('day');
  public timelineStart = this.today.subtract(14, 'day');
  public timelineEnd = this.today.add(14, 'day');
  public todayIndex: number | null = null;
  public columnWidth = 80;
  public workCenterColumnWidth = 220;

  public workCenters = [
    { id: 1, value: 'genesisHardware', label: 'Genesis Hardware' },
    { id: 2, value: 'rodriguesElectrics', label: 'Rodrigues Electrics' },
    { id: 3, value: 'konsultingInc', label: 'Konsulting Inc' },
    { id: 4, value: 'mcMarrowDistribution', label: 'McMarrow Distribution' },
    { id: 5, value: 'spartanManufacturing', label: 'Spartan Manufacturing' },
  ];
  public mockOrders = [
    {
      workCenterId: 3,
      label: 'Konsulting Inc',
      start: dayjs().subtract(2, 'day'),
      end: dayjs().add(6, 'day'),
      status: 'in-progress',
    },
    {
      workCenterId: 4,
      label: 'McMarrow Distribution',
      start: dayjs().subtract(1, 'day'),
      end: dayjs().add(9, 'day'),
      status: 'blocked',
    },
    {
      workCenterId: 4,
      label: 'McMarrow Distribution',
      start: dayjs().add(11, 'day'),
      end: dayjs().add(1, 'day'),
      status: 'blocked',
    },
    {
      workCenterId: 1,
      label: 'McMarrow Distribution',
      start: dayjs().subtract(2, 'day'),
      end: dayjs().add(10, 'day'),
      status: 'complete',
    },
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

  public get todayLineLeft(): number | null {
    if (this.todayIndex === null || this.todayIndex < 0) return null;

    return (
      this.workCenterColumnWidth +
      this.todayIndex * this.columnWidth +
      this.columnWidth / 2
    );
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
    this.calculateTodayIndex();
  }

  private calculateTodayIndex(): void {
    const now = dayjs();

    this.todayIndex = this.timeSlots.findIndex((slot) => {
      switch (this.timeScale) {
        case 'hour':
          return slot.isSame(now, 'hour');

        case 'week':
          return slot.isSame(now, 'week');

        case 'month':
          return slot.isSame(now, 'month');

        case 'day':
        default:
          return slot.isSame(now, 'day');
      }
    });
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

  private isSameSlot(date: dayjs.Dayjs, slot: dayjs.Dayjs): boolean {
    switch (this.timeScale) {
      case 'hour':
        return date.isSame(slot, 'hour');
      case 'week':
        return date.isSame(slot, 'week');
      case 'month':
        return date.isSame(slot, 'month');
      case 'day':
      default:
        return date.isSame(slot, 'day');
    }
  }

  public getOrdersForCenter(centerId: number) {
    return this.mockOrders.filter((o) => o.workCenterId === centerId);
  }

  public getOrderLeft(order: any): number {
    const startIndex = this.timeSlots.findIndex(
      (slot) => this.isSameSlot(order.start, slot) || order.start.isBefore(slot)
    );
    if (startIndex < 0) return 0;

    return this.workCenterColumnWidth + startIndex * this.columnWidth;
  }

  public getOrderWidth(order: any): number {
    const startIndex = this.timeSlots.findIndex(
      (slot) => this.isSameSlot(order.start, slot) || order.start.isBefore(slot)
    );

    const reversedIndex = [...this.timeSlots]
      .reverse()
      .findIndex(
        (slot) => this.isSameSlot(order.end, slot) || order.end.isAfter(slot)
      );

    if (startIndex < 0 || reversedIndex < 0) {
      return this.columnWidth;
    }

    const endIndex = this.timeSlots.length - 1 - reversedIndex;

    return (endIndex - startIndex + 1) * this.columnWidth;
  }

  selectOrder(order: any) {
    console.log(order);
    this.orderSelected.emit(order);
  }
}
