import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';

import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { AreasModule } from 'src/app/areas/areas.module';
import { AiModule } from 'src/app/ai/ai.module';

import { AppService } from 'src/app/app.service';
import { BACKEND_URL } from 'src/app/constants';

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
