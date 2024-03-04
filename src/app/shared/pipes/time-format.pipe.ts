import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class TimeFormatPipe implements PipeTransform {

  private wordHour!: string;
  private wordMinutes!: string;

  transform(value: number, ...args: unknown[]): unknown {

    const hours = (value / 3600);
    const rHours = Math.floor(hours);
    const restHour = rHours % 10;

    if (restHour === 1) {
      this.wordHour = 'час';
    } else if (restHour > 1 && restHour < 5) {
      this.wordHour = 'часа';
    } else this.wordHour = 'часов';

    const minutes = (hours - rHours) * 60;
    const rMinutes = Math.round(minutes);
    const resMinutes = rMinutes % 10;

    if (resMinutes === 1) {
      this.wordMinutes = 'минута';
    } else if (resMinutes > 1 && resMinutes < 5) {
      this.wordMinutes = 'минуты';
    } else this.wordMinutes = 'минут';

    return `${rHours} ${this.wordHour} ${rMinutes} ${this.wordMinutes}`
  }

}
