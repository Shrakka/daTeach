import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeaderComponent } from './header';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
	declarations: [
		HeaderComponent
	],
	imports: [
		IonicPageModule.forChild(HeaderComponent),
		TranslateModule
	],
	exports: [
		HeaderComponent
	]
})
export class HeaderComponentModule {}
