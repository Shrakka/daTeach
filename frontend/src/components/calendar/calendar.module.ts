import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
	declarations: [CalendarComponent],
	imports: [IonicPageModule.forChild(CalendarComponent), TranslateModule],
	exports: [CalendarComponent]
})
export class CalendarComponentModule {}
