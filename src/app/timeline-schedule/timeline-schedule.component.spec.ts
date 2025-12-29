import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineScheduleComponent } from './timeline-schedule.component';

describe('TimelineScheduleComponent', () => {
  let component: TimelineScheduleComponent;
  let fixture: ComponentFixture<TimelineScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelineScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
