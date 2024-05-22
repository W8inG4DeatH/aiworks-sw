import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { AreasModule } from 'src/app/areas/areas.module';

import { AppService } from 'src/app/app.service';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, FlexLayoutModule, CommonComponentsModule, AreasModule],
    providers: [AppService],
    bootstrap: [AppComponent],
})
export class AppModule {}
