import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonCardComponent } from './lesson-card';
@NgModule({
	declarations: [LessonCardComponent],
	imports: [IonicPageModule.forChild(LessonCardComponent)],
	exports: [LessonCardComponent]
})
export class LessonCardComponentModule {}
