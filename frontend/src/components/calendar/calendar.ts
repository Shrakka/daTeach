import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  // Format date: 'Mon. 23/10-AM'

  @Input() initdates;
  @Input() modifiable: boolean;
  @Input() mode: string;
  @Output() dates: EventEmitter<Array<string>> = new EventEmitter();
  days: Array<string> = [];
  selecteds: Array<string> = [];
  names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor() {
    for (var i = 0; i < 10; i++) {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + i);
      this.days.push(this.dateToString(tomorrow));
    }
    this.selecteds = [];
  }

  ngOnInit() {
    this.selecteds = this.initdates;
  }

  dateToString(date: Date) {
    var weekday = (date.getDay() == 0) ? 6 : date.getDay() - 1;
    var day = ('0' + date.getDate() + '');
    day = day.substring(day.length-2)
    var month = '0' + (date.getMonth() + 1);
    month = month.substring(month.length-2)
    return this.names[weekday] + '. ' + day + '/' + month;
  }

  pickDate(day: string, period: string) {
    if (this.modifiable) {
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
  }

  isSelected(day: string, period: string) {
    return (this.selecteds.includes(day + '-' + period)) ? 'selected calendar-' + this.mode : this.isWeekend(day);
  }

  isWeekend(day: string) {
    return (day[0] === 'S') ? 'weekend' : '';
  }

}
