import { Component } from '@angular/core';

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent {
  days: Array<string> = [];
  selecteds: Array<string> = [];

  constructor() {
    for (var i = 0; i < 10; i++) {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + i);
      this.days.push(this.dateToString(tomorrow));
    }
  }

  dateToString(date: Date) {
    var day = date.getDate() + '';
    var month = Number(date.getMonth()) + 1 + '';
    return ((day.length == 2) ? '' : '0') + day + '/' + ((month.length == 2) ? '' : '0') + month;
  }

  pickDate(day: string, period: string) {
    var date = day + ' ' + period;
    var index = this.selecteds.indexOf(date);
    if (index != -1) {
      this.selecteds.splice(index, 1)
    }
    else {
      this.selecteds.push(date)
    }
  }

  isSelected(day: string, period: string) {
    return (this.selecteds.includes(day + ' ' + period)) ? 'selected' : '';
  }

}
