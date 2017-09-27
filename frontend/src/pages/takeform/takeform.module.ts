import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakeformPage } from './takeform';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TakeformPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TakeformPage),
  ],
})
export class TakeformPageModule {}
