import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiveformPage } from './giveform';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GiveformPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(GiveformPage),
  ],
})
export class GiveformPageModule {}
