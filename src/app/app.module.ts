import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { CommonComponentsModule } from './common-components/common-components.module';
import { AreasModule } from './areas/areas.module';
import { AiModule } from './ai/ai.module';

import { AppService } from './app.service';
import { BACKEND_URL } from './constants';

const config: SocketIoConfig = { url: BACKEND_URL, options: {} };

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        SocketIoModule.forRoot(config),
        CommonComponentsModule,
        AreasModule,
        AiModule,
    ],
    providers: [AppService],
    bootstrap: [AppComponent],
})
export class AppModule {}
