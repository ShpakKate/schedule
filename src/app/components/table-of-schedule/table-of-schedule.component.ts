import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-table-of-schedule',
  templateUrl: './table-of-schedule.component.html',
  styleUrls: ['./table-of-schedule.component.scss']
})
export class TableOfScheduleComponent {

  @Input() scheduleList: any;
}
