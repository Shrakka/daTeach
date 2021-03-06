import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { socketURL } from '../../providers/backend/backend';
// const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };
// const config: SocketIoConfig = { url: 'http://ec2-54-77-151-59.eu-west-1.compute.amazonaws.com:8080', options: {} };
const config: SocketIoConfig = { url: socketURL, options: {} };

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
