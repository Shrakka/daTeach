import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [CalendarComponent],
	imports: [IonicPageModule.forChild(CalendarComponent)],
	exports: [CalendarComponent]
})
export class CalendarComponentModule {}
