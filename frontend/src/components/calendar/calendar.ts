import { Component, Input, Output, EventEmitter } from '@angular/core';
import { sysOptions } from '../../app/i18n.constants';

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
  sysOptions: any;
  // Format date: 'Mon. 23/10-AM'

  @Input() dates: Array<string>;
  @Input() modifiable: boolean;
  @Input() mode: string;
  @Output() datesEmitter: EventEmitter<Array<string>> = new EventEmitter();
  days: Array<string> = [];
  names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  namesFR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];


  constructor() {
    this.sysOptions = sysOptions;
    for (var i = 0; i < 10; i++) {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + i);
      this.days.push(this.dateToString(tomorrow));
    }
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
      var index = this.dates.indexOf(date);
      if (index != -1) {
        this.dates.splice(index, 1)
      }
      else {
        this.dates.push(date)
      }
      this.datesEmitter.emit(this.dates);
    }
  }

  isSelected(day: string, period: string) {
    return (this.dates.includes(day + '-' + period)) ? 'selected calendar-' + this.mode : this.isWeekend(day);
  }

  isWeekend(day: string) {
    return (day[0] === 'S') ? 'weekend' : '';
  }

  getDay(day: string) {
    if (this.sysOptions.systemLanguage == 'fr') {
      var index = this.names.indexOf(day.split('.')[0]);
      return this.namesFR[index] + '.' + day.split('.')[1];
    }
    else {
      return day;
    }
  }

}
