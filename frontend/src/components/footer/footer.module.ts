import { NgModule } from '@angular/core';
import { FooterComponent } from './footer';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [FooterComponent],
	imports: [IonicPageModule.forChild(FooterComponent)],
	exports: [FooterComponent]
})

export class FooterComponentModule {}
