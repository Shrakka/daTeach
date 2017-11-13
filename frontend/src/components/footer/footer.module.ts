import { NgModule } from '@angular/core';
import { FooterComponent } from './footer';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
	declarations: [FooterComponent],
	imports: [
		IonicPageModule.forChild(FooterComponent),
		TranslateModule
	],
	exports: [FooterComponent]
})

export class FooterComponentModule {}
