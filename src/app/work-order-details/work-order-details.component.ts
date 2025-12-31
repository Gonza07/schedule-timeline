import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-work-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-order-details.component.html',
  styleUrl: './work-order-details.component.scss',
})
export class WorkOrderDetailsComponent {
  @Input() order: any;
  @Output() close = new EventEmitter<void>();

  formatDate(date: dayjs.Dayjs): string {
    return date ? dayjs(date).format('YYYY-MM-DD') : '';
  }

  onCancel() {
    this.close.emit();
  }

  onCreate() {
    console.log('Create clicked (mock)');
  }
}
