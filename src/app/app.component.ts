import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'transport-schedule';

  public scheduleList: any;
  public isAbsent!: boolean;

  getScheduleList(event: any) {
    this.scheduleList = event;

    this.isAbsent = this.scheduleList && this.scheduleList.length == 0;
  }
}
