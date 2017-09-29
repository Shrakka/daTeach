import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    FooterComponentModule,
    HeaderComponentModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
