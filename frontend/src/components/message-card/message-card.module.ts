import { NgModule } from '@angular/core';
import { MessageCardComponent } from './message-card';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [MessageCardComponent],
	imports: [IonicPageModule.forChild(MessageCardComponent)],
	exports: [MessageCardComponent]
})
export class MessageCardComponentModule {}
