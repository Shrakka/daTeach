import { Component, Output, EventEmitter } from '@angular/core';

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
  @Output() dates: EventEmitter<Array<string>> = new EventEmitter();

  constructor() {
    for (var i = 0; i < 10; i++) {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + i);
      this.days.push(this.dateToString(tomorrow));
    }
  }

  dateToString(date: Date) {
    var day = ('0' + date.getDate() + '');
    day = day.substring(day.length-2)
    var month = '0' + (date.getMonth() + 1);
    month = month.substring(month.length-2)
    var year = date.getFullYear() % 2000;
    return day + "/" + month + "/" + year;
  }

  pickDate(day: string, period: string) {
    var date = day + '-' + period;
    var index = this.selecteds.indexOf(date);
    if (index != -1) {
      this.selecteds.splice(index, 1)
    }
    else {
      this.selecteds.push(date)
    }
    this.dates.emit(this.selecteds);
  }

  isSelected(day: string, period: string) {
    return (this.selecteds.includes(day + '-' + period)) ? 'selected' : '';
  }

}
