import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [HeaderComponent],
	imports: [
		IonicModule.forRoot(HeaderComponent)
	],
	exports: [HeaderComponent]
})
export class ComponentsModule {}
