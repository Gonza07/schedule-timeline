import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-schedule.component.html',
  styleUrl: './timeline-schedule.component.scss',
})
export class TimelineScheduleComponent {
  public workCenters = [
    { id: 1, value: 'genesisHardware', label: 'Genesis Hardware' },
    { id: 2, value: 'rodriguesElectrics', label: 'Rodrigues Electrics' },
    { id: 3, value: 'konsultingInc', label: 'Konsulting Inc' },
    { id: 4, value: 'mcMarrowDistribution', label: 'McMarrow Distribution' },
    { id: 5, value: 'spartanManufacturing', label: 'Spartan Manufacturing' },
  ];
}
