import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-work-orders',
  standalone: true,
  imports: [CommonModule,NgSelectModule],
  templateUrl: './work-orders.component.html',
  styleUrl: './work-orders.component.scss',
})
export class WorkOrdersComponent {
  public selectedTimescale: string = '';
  public timescales = [
    { value: 'hour', label: 'Hour' },
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ];

  public workCenters = [
    { id: 1,value: 'genesisHardware', label: 'Genesis Hardware' },
    { id: 2,value: 'rodriguesElectrics', label: 'Rodrigues Electrics' },
    { id: 3,value: 'konsultingInc', label: 'Konsulting Inc' },
    { id: 4,value: 'mcMarrowDistribution', label: 'McMarrow Distribution' },
    { id: 5,value: 'spartanManufacturing', label: 'Spartan Manufacturing' },
  ];
}
