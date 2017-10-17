import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://10.42.0.1:8080', options: {} };

@NgModule({
  declarations: [
    ChatPage,
  ],
  imports: [
    SocketIoModule.forRoot(config),
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(ChatPage),
  ],
})
export class ChatPageModule {}
