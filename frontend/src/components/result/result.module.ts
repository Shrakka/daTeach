import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultComponent } from './result';
@NgModule({
	declarations: [ResultComponent],
	imports: [IonicPageModule.forChild(ResultComponent)],
	exports: [ResultComponent]
})
export class ResultComponentModule {}
