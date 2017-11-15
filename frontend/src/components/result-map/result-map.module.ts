import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultMapComponent } from './result-map';
@NgModule({
	declarations: [ResultMapComponent],
	imports: [IonicPageModule.forChild(ResultMapComponent)],
	exports: [ResultMapComponent]
})
export class ResultMapComponentModule {}
